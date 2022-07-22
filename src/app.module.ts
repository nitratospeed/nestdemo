import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ProductController } from './api/controllers/v1/product.controller';
import { CreateProductCommand } from './application/core/products/commands/create-product.command';
import { CreateProductHandler } from './application/core/products/commands/create-product.handler';
import { UpdateProductCommand } from './application/core/products/commands/update-product.command';
import { UpdateProductHandler } from './application/core/products/commands/update-product.handler';
import { GetProductByIdHandler } from './application/core/products/queries/get-product-by-id.handler';
import { GetProductByIdQuery } from './application/core/products/queries/get-product-by-id.query';
import { ProductDetailConfiguration } from './infrastructure/persistence/configurations/product-detail.configuration';
import { ProductConfiguration } from './infrastructure/persistence/configurations/product.configuration';
import { ProductDetailRepository } from './infrastructure/persistence/repositories/product-detail.repository';
import { ProductRepository } from './infrastructure/persistence/repositories/product.repository';
import { CacheService } from './infrastructure/services/cache.service';
import { RetoolService } from './infrastructure/services/retool.service';

@Module({
  imports: [
    CqrsModule, 
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    TypeOrmModule.forFeature([ProductConfiguration, ProductDetailConfiguration]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      username: 'admin',
      password: 'admin2022!',
      database: 'nestdemo',
      entities: [ProductConfiguration, ProductDetailConfiguration],
      synchronize: true,
      authSource: 'admin',
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }), 
    CacheModule.register()],
  controllers: [ProductController],
  providers: [
    CacheService,
    RetoolService,
    ProductRepository, 
    ProductDetailRepository,
    CreateProductCommand, 
    CreateProductHandler, 
    UpdateProductCommand, 
    UpdateProductHandler,
    GetProductByIdQuery,
    GetProductByIdHandler,
  ],
})
export class AppModule {}
