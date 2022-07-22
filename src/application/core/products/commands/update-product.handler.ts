import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductCommand } from "./update-product.command";
import { ProductDetail } from "src/domain/entities/product-detail";
import { ProductDetailRepository } from "src/infrastructure/persistence/repositories/product-detail.repository";
import { ProductRepository } from "src/infrastructure/persistence/repositories/product.repository";
import { BaseResponse } from "src/application/common/models/base-response";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productDetailRepository: ProductDetailRepository,
    ) {}

  async execute(command: UpdateProductCommand): Promise<BaseResponse<string>> {
    const response = new BaseResponse<string>();

    try {
      const { request } = command;

      const product = await this.productRepository.findOne(request.id);

      if (product == null) {
        response.message = 'Error: Product not found.'
        throw new Error(response.message);   
      }

      product.name = request.name;
      product.description = request.description;
      product.updatedBy = 'system';
      product.updatedAt = new Date;

      await this.productRepository.update(product);

      for (let index = 0; index < request.productDetails.length; index++) {
        if(request.productDetails[index].id == '' || request.productDetails[index].id == null){
          const productDetail = new ProductDetail();

          productDetail.productId = product._id;
          productDetail.price = request.productDetails[index].price;
          productDetail.stock = request.productDetails[index].stock;
          productDetail.createdBy = 'system';
          productDetail.createdAt = new Date;

          await this.productDetailRepository.create(productDetail);
        }
        else {
          const productDetail = await this.productDetailRepository.findOne(request.productDetails[index].id);

          productDetail.price = request.productDetails[index].price;
          productDetail.stock = request.productDetails[index].stock;
          productDetail.updatedBy = 'system';
          productDetail.updatedAt = new Date;

          await this.productDetailRepository.update(productDetail);
        }
      }
          
      response.success = true;
      response.data = '';
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