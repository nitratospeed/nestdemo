import { QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetProductByIdQuery } from "./get-product-by-id.query";
import { GetProductByIdResponse } from "./get-product-by-id.response";
import { ProductDetailRepository } from "src/infrastructure/persistence/repositories/product-detail.repository";
import { ProductRepository } from "src/infrastructure/persistence/repositories/product.repository";
import { RetoolService } from "src/infrastructure/services/retool.service";
import { BaseResponse } from "src/application/common/models/base-response";
import { CacheService } from "src/infrastructure/services/cache.service";

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler{
    constructor(
      private readonly productRepository: ProductRepository,
      private readonly productDetailRepository: ProductDetailRepository,
      private readonly cacheService: CacheService,
      private readonly retoolService: RetoolService,
      ) {}

  async execute(query: GetProductByIdQuery): Promise<BaseResponse<GetProductByIdResponse>> {
    const response = new BaseResponse<GetProductByIdResponse>();

    try {
      const { request } = query;

      const product = await this.productRepository.findOne(request.id);

      if (product == null) {
        response.message = 'Error: Product not found.'
        throw new Error(response.message);   
      }

      const productDetails = await this.productDetailRepository.findAllByProductId(product._id);

      const productExternalDetail = await this.retoolService.findByProductId(product._id);

      if (productExternalDetail == null) {
        response.message = 'Error: External details of product not found.'
        throw new Error(response.message);   
      }

      const result = new GetProductByIdResponse();
  
      result.id = product._id;
      result.name = product.name;
      result.description = product.description;
      result.cacheProperty1 = await this.cacheService.get('cacheProperty1');
      result.cacheProperty2 = await this.cacheService.get('cacheProperty2');
      result.externalProperty1 = productExternalDetail.ratingStars ?? '';
      result.externalProperty2 = productExternalDetail.reviewCount ?? '';
      result.productDetails = productDetails;
  
      response.success = true;
      response.data = result;
      response.message = 'Ok: Data processed successfully.';

      return response;
    } 
    catch (error) {
      console.log(error.message);

      response.success = false;
      response.data = null;
      response.message = response.message ?? 'Error: The data could not be processed. Please try again.';

      return response;
    }
  }
}