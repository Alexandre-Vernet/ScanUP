import { Product } from './product';

export class Cart {
    private _products: Product[];

    constructor() {
        this._products = new Array<Product>();
    }

    get products(): Product[] {
        return this._products;
    }

    addProduct(product: Product) {
        this._products.push(product);
    }

    deleteProductById(id: number) {
        this._products.slice(id, 1);
    }
}
