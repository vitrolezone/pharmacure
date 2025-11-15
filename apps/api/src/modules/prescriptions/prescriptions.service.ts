import { Injectable } from '@nestjs/common';
import { prisma } from '@pharmify/db';

@Injectable()
export class PrescriptionsService {
  async upload(file: Express.Multer.File, userId: string) {
    // TODO: Upload to S3
    // TODO: Implement OCR if needed
    // TODO: Validate file type and size

    const prescription = await prisma.prescription.create({
      data: {
        userId,
        fileUrl: file.path, // In production, use S3 URL
        fileName: file.originalname,
        fileType: file.mimetype,
        status: 'PENDING',
      },
    });

    return {
      message: 'Prescription uploaded successfully',
      prescriptionId: prescription.id,
      // TODO: Return OCR results if implemented
    };
  }

  async findOne(id: string) {
    return prisma.prescription.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}

