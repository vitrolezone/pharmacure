import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe')
  async stripe(@Body() body: any) {
    return this.paymentsService.handleStripe(body);
  }

  @Post('upi')
  async upi(@Body() body: any) {
    return this.paymentsService.handleUpi(body);
  }
}
