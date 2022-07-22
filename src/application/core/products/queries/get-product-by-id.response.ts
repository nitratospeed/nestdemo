export class GetProductByIdResponse{
    id: string;
    name: string;
    description: string;
    cacheProperty1: string;
    cacheProperty2: string;
    externalProperty1: string;
    externalProperty2: string;
    productDetails: ProductDetail[];
}

class ProductDetail{
    price: number;
    stock: number;
}