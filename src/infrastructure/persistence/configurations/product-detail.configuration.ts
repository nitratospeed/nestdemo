import { ProductDetail } from "src/domain/entities/product-detail";
import { EntitySchema } from "typeorm";

export const ProductDetailConfiguration = new EntitySchema<ProductDetail>({
    name: 'ProductDetail',
    target: ProductDetail,
    columns: {
        _id: {
            type: String,
            primary: true,
            //generated: true, //relational db
            objectId: true, //no relational db
            nullable: false,
        },
        productId: {
            type: String,
            nullable: false,
        },
        price: {
            type: Number,
            nullable: false,
        },
        stock: {
            type: Number,
            nullable: false,
        },
        createdBy: {
            type: String,
            nullable: false,
        },
        createdAt: {
            type: Date,
            nullable: false,
        },
        updatedBy: {
            type: String,
            nullable: true,
        },
        updatedAt: {
            type: Date,
            nullable: true,
        },
    }
})