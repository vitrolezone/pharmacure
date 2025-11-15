import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async search(@Query('q') query?: string, @Query('page') page = '1', @Query('limit') limit = '20') {
    return this.productsService.search(query, parseInt(page), parseInt(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get(':id/price-comparison')
  async getPriceComparison(@Param('id') id: string) {
    return this.productsService.getPriceComparison(id);
  }
}

