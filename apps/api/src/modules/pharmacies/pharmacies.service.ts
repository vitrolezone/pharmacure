import { Injectable } from '@nestjs/common';
import { prisma } from '@pharmify/db';

@Injectable()
export class PharmaciesService {
  async findAll() {
    return prisma.pharmacy.findMany({
      where: { verified: true },
      include: {
        _count: {
          select: { inventory: true },
        },
      },
    });
  }

  async findNearby(latitude: number, longitude: number, radiusKm = 10) {
    // Simple distance calculation (Haversine formula would be better for production)
    // For MVP, we'll use a bounding box approach
    const pharmacies = await prisma.pharmacy.findMany({
      where: {
        verified: true,
        latitude: {
          gte: latitude - radiusKm / 111, // Rough conversion: 1 degree ≈ 111 km
          lte: latitude + radiusKm / 111,
        },
        longitude: {
          gte: longitude - radiusKm / 111,
          lte: longitude + radiusKm / 111,
        },
      },
    });

    // Calculate distances and sort
    const pharmaciesWithDistance = pharmacies.map((pharmacy) => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        pharmacy.latitude,
        pharmacy.longitude
      );
      return {
        ...pharmacy,
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal
      };
    });

    return pharmaciesWithDistance.sort((a, b) => a.distance - b.distance);
  }

  async findOne(id: string) {
    return prisma.pharmacy.findUnique({
      where: { id },
      include: {
        inventory: {
          include: {
            product: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}

