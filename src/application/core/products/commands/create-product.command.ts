import { CreateProductRequest } from "./create-product.request";

export class CreateProductCommand{
    constructor(
        public readonly request: CreateProductRequest,
      ) {}
}