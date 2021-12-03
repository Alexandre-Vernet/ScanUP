import { ProductCart } from "./product-cart";

export class Cart {
    private readonly _products: ProductCart[];

    constructor() {
        this._products = new Array<ProductCart>();
    }

    get products(): ProductCart[] {
        return this._products;
    }

    addProduct(product: ProductCart) {
        this._products.push(product);
    }

    deleteProductById(id: number) {
        this._products.slice(id, 1);
    }

    getById(id: number) {
        const found = this._products.find(x => {
            return x.id === id;
        });

        return found;

        // this._products.forEach(element => {
        //     if (element.id === id) {
        //         return element;
        //     }
        // });
    }
}
