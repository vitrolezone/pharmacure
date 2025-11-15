import { Injectable } from '@nestjs/common';
import { prisma } from '@pharmify/db';

@Injectable()
export class ProductsService {
  async search(query?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    if (query) {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { brand: { contains: query, mode: 'insensitive' } },
            { genericName: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: {
          inventory: {
            include: {
              pharmacy: true,
            },
          },
        },
      });

      const total = await prisma.product.count({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { brand: { contains: query, mode: 'insensitive' } },
            { genericName: { contains: query, mode: 'insensitive' } },
          ],
        },
      });

      return {
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      include: {
        inventory: {
          include: {
            pharmacy: true,
          },
        },
      },
    });

    const total = await prisma.product.count();

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        inventory: {
          include: {
            pharmacy: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async getPriceComparison(productId: string) {
    const inventories = await prisma.inventory.findMany({
      where: {
        productId,
        quantity: { gt: 0 },
      },
      include: {
        pharmacy: true,
      },
      orderBy: {
        price: 'asc',
      },
    });

    return {
      productId,
      comparisons: inventories.map((inv) => ({
        pharmacyId: inv.pharmacyId,
        pharmacyName: inv.pharmacy.name,
        price: inv.price,
        quantity: inv.quantity,
        deliveryFee: inv.pharmacy.deliveryFee,
        totalPrice: inv.price + inv.pharmacy.deliveryFee,
        estimatedDelivery: inv.pharmacy.estimatedDeliveryMinutes,
      })),
    };
  }
}

