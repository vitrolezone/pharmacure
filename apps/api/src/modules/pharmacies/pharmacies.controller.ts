import { Controller, Get, Query, Param } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';

@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Get()
  async findNearby(
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
    @Query('radius') radius = '10'
  ) {
    if (lat && lng) {
      return this.pharmaciesService.findNearby(
        parseFloat(lat),
        parseFloat(lng),
        parseFloat(radius)
      );
    }
    return this.pharmaciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pharmaciesService.findOne(id);
  }
}

