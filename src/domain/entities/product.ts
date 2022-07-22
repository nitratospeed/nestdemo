import { Audit } from "../common/audit";

export class Product extends Audit{
    _id: string;
    name: string;
    description: string;
}