import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetProductByIdRequest{
    @ApiProperty()
    @IsNotEmpty()
    id: string;
}