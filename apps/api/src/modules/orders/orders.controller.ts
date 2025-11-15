import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: any) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateDto: { status: string }) {
    return this.ordersService.updateStatus(id, updateDto.status);
  }

  @Get(':id/track')
  async track(@Param('id') id: string) {
    return this.ordersService.track(id);
  }
}

