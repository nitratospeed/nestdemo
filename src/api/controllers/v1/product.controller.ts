import { Body, Controller, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { LoggingInterceptor } from "src/api/interceptors/logging.interceptor";
import { CreateProductCommand } from "src/application/core/products/commands/create-product.command";
import { CreateProductRequest } from "src/application/core/products/commands/create-product.request";
import { UpdateProductCommand } from "src/application/core/products/commands/update-product.command";
import { UpdateProductRequest } from "src/application/core/products/commands/update-product.request";
import { GetProductByIdQuery } from "src/application/core/products/queries/get-product-by-id.query";

@ApiTags('Product')
@Controller('product')
@UseInterceptors(LoggingInterceptor)
export class ProductController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
      ) {}
    
    @Get(':id')
    @HttpCode(200)
    async getById(@Param('id') id: string) {
        return await this.queryBus.execute(new GetProductByIdQuery({ id : id }));
    }

    @Post()
    @HttpCode(200)
    async create(@Body() request: CreateProductRequest) {
        return await this.commandBus.execute(new CreateProductCommand(request));
    }

    @Put()
    @HttpCode(200)
    async update(@Body() request: UpdateProductRequest) {
        return await this.commandBus.execute(new UpdateProductCommand(request));
    }
}