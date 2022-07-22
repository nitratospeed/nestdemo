import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductRequest{
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: () => [CreateProductDetailRequest] })
    @IsNotEmpty()
    productDetails: CreateProductDetailRequest[];
}

class CreateProductDetailRequest{
    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    stock: number;
}