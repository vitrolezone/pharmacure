import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { PharmaciesModule } from './modules/pharmacies/pharmacies.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProductsModule,
    PharmaciesModule,
    OrdersModule,
    AuthModule,
    PrescriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

