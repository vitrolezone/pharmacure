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

  async getPrices(productId: string) {
    const inventories = await prisma.inventory.findMany({
      where: { productId, quantity: { gt: 0 } },
      include: { pharmacy: true },
      orderBy: { price: 'asc' },
    });

    return {
      productId,
      prices: inventories.map((inv) => ({
        pharmacyId: inv.pharmacyId,
        pharmacyName: inv.pharmacy.name,
        price: inv.price,
        deliveryFee: inv.pharmacy.deliveryFee || 0,
        deliveryEstimateMin: inv.pharmacy.estimatedDeliveryMinutes || 30,
      })),
    };
  }

  async getNearbyCheap(lat: number, lng: number, radiusKm = 5) {
    const pharmacies = await prisma.pharmacy.findMany({
      where: {
        latitude: {
          gte: lat - 0.1,
          lte: lat + 0.1,
        },
        longitude: {
          gte: lng - 0.1,
          lte: lng + 0.1,
        },
      },
      take: 3,
    });

    const pharmacyIds = pharmacies.map((p) => p.id);

    const products = await prisma.product.findMany({
      where: {
        inventory: {
          some: {
            pharmacyId: { in: pharmacyIds },
            quantity: { gt: 0 },
          },
        },
      },
      include: {
        inventory: {
          where: { pharmacyId: { in: pharmacyIds } },
          include: { pharmacy: true },
        },
      },
      take: 10,
    });

    return {
      mode: 'nearby',
      pharmacies: pharmacies.map((p) => ({
        id: p.id,
        name: p.name,
        distanceKm: Math.random() * 5 + 0.5,
        estimatedDeliveryMin: p.estimatedDeliveryMinutes || 30,
      })),
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        rxRequired: p.rxRequired,
        inventory: p.inventory,
      })),
    };
  }

  async getCheapestProducts() {
    const products = await prisma.product.findMany({
      include: {
        inventory: {
          where: { quantity: { gt: 0 } },
          include: { pharmacy: true },
          orderBy: { price: 'asc' },
        },
      },
      take: 50,
    });

    return {
      mode: 'cheapest',
      products: products
        .filter((p) => p.inventory.length > 0)
        .map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          rxRequired: p.rxRequired,
          cheapestPrice: p.inventory[0].price,
          cheapestPharmacyId: p.inventory[0].pharmacyId,
          inventory: p.inventory,
        }))
        .sort((a, b) => a.cheapestPrice - b.cheapestPrice)
        .slice(0, 20),
    };
  }
}

