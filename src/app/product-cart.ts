import { Product } from "./product";

export class ProductCart extends Product {
    private _quantity: number;

    constructor(id: number, name: string, price: number, quantity: number) {
        super(id, name, price);
        this._quantity = quantity;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }
}
