import { UpdateProductRequest } from "./update-product.request";

export class UpdateProductCommand{
    constructor(
        public readonly request: UpdateProductRequest,
      ) {}
}