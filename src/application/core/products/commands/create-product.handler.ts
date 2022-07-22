import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "./create-product.command";
import { Product } from "src/domain/entities/product";
import { ProductDetail } from "src/domain/entities/product-detail";
import { ProductDetailRepository } from "src/infrastructure/persistence/repositories/product-detail.repository";
import { ProductRepository } from "src/infrastructure/persistence/repositories/product.repository";
import { RetoolService } from "src/infrastructure/services/retool.service";
import { BaseResponse } from "src/application/common/models/base-response";
import { CacheService } from "src/infrastructure/services/cache.service";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productDetailRepository: ProductDetailRepository,
    private readonly cacheService: CacheService,
    private readonly retoolService: RetoolService,
    ) {}

  async execute(command: CreateProductCommand) : Promise<BaseResponse<string>> {
    const response = new BaseResponse<string>();

    try {
      const { request } = command;

      const product = new Product();

      product.name = request.name;
      product.description = request.description;
      product.createdBy = 'system';
      product.createdAt = new Date;

      const productCreated = await this.productRepository.create(product);

      for (let index = 0; index < request.productDetails.length; index++) {
        const productDetail = new ProductDetail();

        productDetail.productId = productCreated._id;
        productDetail.price = request.productDetails[index].price;
        productDetail.stock = request.productDetails[index].stock;
        productDetail.createdBy = 'system';
        productDetail.createdAt = new Date;

        await this.productDetailRepository.create(productDetail);
      }

      await this.cacheService.set('cacheProperty1', 'PERU');
      await this.cacheService.set('cacheProperty2', 'SOLES');

      await this.retoolService.create(productCreated._id);

      response.success = true;
      response.data = productCreated._id.toString();
      response.message = 'Ok: Data processed successfully.';

      return response;
    } 
    catch (error) {
      console.log(error.message);

      response.success = false;
      response.data = '';
      response.message = response.message ?? 'Error: The data could not be processed. Please try again.';

      return response;
    }   
  }
}