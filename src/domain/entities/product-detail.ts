import { Audit } from "../common/audit";

export class ProductDetail extends Audit{
    _id : string;
    productId: string;
    price: number;
    stock: number;
}