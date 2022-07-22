import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateProductRequest{
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: () => [UpdateProductDetailRequest] })
    @IsNotEmpty()
    productDetails: UpdateProductDetailRequest[];
}

class UpdateProductDetailRequest{
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    stock: number;
}