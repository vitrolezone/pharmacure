import { Injectable } from '@nestjs/common';
import { prisma } from '@pharmify/db';

@Injectable()
export class PaymentsService {
  async handleStripe(body: any) {
    const { orderId, card } = body;

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
    if (!order) throw new Error('Order not found');

    // Mock: if last digit of card number is even => success
    const cardNum = String(card?.number || '4242').replace(/\s/g, '');
    const lastDigit = parseInt(cardNum[cardNum.length - 1] || '0');
    const success = lastDigit % 2 === 0;

    if (success) {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'COMPLETED' },
      });

      if (order.payment) {
        await prisma.payment.update({
          where: { id: order.payment.id },
          data: { status: 'COMPLETED', providerId: `txn_mock_${orderId}` },
        });
      }

      return {
        orderId,
        status: 'PAID',
        transactionId: `txn_mock_${orderId}`,
      };
    }

    return {
      orderId,
      status: 'FAILED',
      error: 'Mock card payment declined',
    };
  }

  async handleUpi(body: any) {
    const { orderId } = body;

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
    if (!order) throw new Error('Order not found');

    // Mock: always succeeds
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: 'COMPLETED' },
    });

    if (order.payment) {
      await prisma.payment.update({
        where: { id: order.payment.id },
        data: { status: 'COMPLETED', providerId: `upi_mock_${orderId}` },
      });
    }

    return {
      orderId,
      status: 'PAID',
      upiId: `pharmify@upi.mock`,
      transactionId: `upi_mock_${orderId}`,
    };
  }
}
