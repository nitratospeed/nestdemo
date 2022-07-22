import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDetail } from "src/domain/entities/product-detail";
import { Repository } from "typeorm";
import { ProductDetailConfiguration } from "../configurations/product-detail.configuration";

@Injectable()
export class ProductDetailRepository{
    constructor(
        @InjectRepository(ProductDetailConfiguration)
        private repository: Repository<ProductDetail>,
      ) {}

    async findOne(_id: any): Promise<ProductDetail> {
      return await this.repository.findOne(_id);
    }

    async findAllByProductId(productId: any): Promise<ProductDetail[]> {
      return await this.repository.findBy({ productId : productId });
    }

    async create(entity: ProductDetail): Promise<ProductDetail> {
      return await this.repository.save(entity);
    }

    async update(entity: ProductDetail): Promise<void> {
      await this.repository.update(entity._id, entity);
    }
}