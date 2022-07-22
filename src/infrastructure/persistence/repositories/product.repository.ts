import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/domain/entities/product";
import { Repository } from "typeorm";
import { ProductConfiguration } from "../configurations/product.configuration";

@Injectable()
export class ProductRepository{
    constructor(
        @InjectRepository(ProductConfiguration)
        private productRepository: Repository<Product>,
      ) {}

    async findOne(_id: any): Promise<Product> {
      return await this.productRepository.findOne(_id);
    }

    async create(entity: Product): Promise<Product> {
      return await this.productRepository.save(entity);
    }

    async update(entity: Product): Promise<void> {
      await this.productRepository.update(entity._id, entity);
    }
}