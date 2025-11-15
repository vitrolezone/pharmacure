import { Injectable } from '@nestjs/common';
import { prisma, OrderStatus } from '@pharmify/db';

@Injectable()
export class OrdersService {
  async create(createOrderDto: any) {
    const { userId, items, billing, deliveryOption, paymentMethod } = createOrderDto;

    // Calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) continue;

      let pharmacy = null;
      let price = 0;

      if (item.pharmacyId) {
        const inv = await prisma.inventory.findUnique({
          where: { pharmacyId_productId: { pharmacyId: item.pharmacyId, productId: item.productId } },
          include: { pharmacy: true },
        });
        if (inv) {
          pharmacy = inv.pharmacy;
          price = inv.price;
        }
      } else {
        const inv = await prisma.inventory.findFirst({
          where: { productId: item.productId, quantity: { gt: 0 } },
          include: { pharmacy: true },
          orderBy: { price: 'asc' },
        });
        if (inv) {
          pharmacy = inv.pharmacy;
          price = inv.price;
        }
      }

      if (price > 0) {
        totalAmount += price * item.quantity;
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: price,
        });
      }
    }

    const deliveryFee = deliveryOption?.type === 'ASAP' ? 50 : 30;
    totalAmount += deliveryFee * 100;

    const order = await prisma.order.create({
      data: {
        userId: userId || 'u_test',
        totalAmount,
        deliveryFee: deliveryFee * 100,
        status: 'PENDING' as OrderStatus,
        deliveryAddress: `${billing.street || billing.address}, ${billing.city || ''}, ${billing.postalCode || ''}`,
        items: {
          create: orderItems,
        },
        payment: {
          create: {
            provider: paymentMethod?.type || 'cod',
            amount: totalAmount,
            status: 'PENDING',
            metadata: {
              paymentMethod: paymentMethod?.type,
              billing,
            },
          },
        },
      },
      include: { items: true, payment: true },
    });

    return {
      orderId: order.id,
      status: order.status,
      amount: totalAmount / 100,
      payment: {
        provider: paymentMethod?.type || 'cod',
        clientSecret: `mock_client_secret_${order.id}`,
      },
    };
  }

  async findOne(id: string): Promise<any> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        pharmacy: true,
        prescription: true,
        payment: true,
        tracking: true,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: {
        status: status as OrderStatus,
      },
    });
  }

  async track(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        tracking: true,
        pharmacy: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return {
      orderId: order.id,
      status: order.status,
      tracking: order.tracking,
      pharmacy: order.pharmacy,
    };
  }
}

