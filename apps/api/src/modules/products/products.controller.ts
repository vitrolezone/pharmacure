import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async search(
    @Query('q') query?: string,
    @Query('mode') mode?: 'nearby' | 'cheapest',
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    if (mode === 'nearby') {
      return this.productsService.getNearbyCheap(parseFloat(lat) || 19.0760, parseFloat(lng) || 72.8777);
    }
    if (mode === 'cheapest') {
      return this.productsService.getCheapestProducts();
    }
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

  @Get(':id/prices')
  async getPrices(@Param('id') id: string) {
    return this.productsService.getPrices(id);
  }
}

