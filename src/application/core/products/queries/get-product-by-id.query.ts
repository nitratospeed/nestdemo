import { GetProductByIdRequest } from "./get-product-by-id.request";

export class GetProductByIdQuery{
    constructor(
        public readonly request: GetProductByIdRequest,
      ) {}
}