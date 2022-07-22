import { Product } from "src/domain/entities/product";
import { EntitySchema } from "typeorm";

export const ProductConfiguration = new EntitySchema<Product>({
    name: 'Product',
    target: Product,
    columns: {
        _id: {
            type: String,
            primary: true,
            //generated: true, //relational db
            objectId: true, //no relational db
            nullable: false,
        },
        name: {
            type: String,
            nullable: false,
        },
        description: {
            type: String,
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
    },
})