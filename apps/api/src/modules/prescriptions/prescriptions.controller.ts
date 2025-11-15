import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body('userId') userId: string) {
    return this.prescriptionsService.upload(file, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(id);
  }
}

