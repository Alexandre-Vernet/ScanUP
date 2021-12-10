import { ProductCart } from "./product-cart";

export class Cart {
    private _products: ProductCart[];

    constructor() {
        this._products = new Array<ProductCart>();
    }

    get products(): ProductCart[] {
        return this._products;
    }

    set products(products: ProductCart[]) {
        this._products = products;
    }

    addProduct(product: ProductCart) {
        const id = this._products.findIndex(p => p.id === product.id);
        if (id === -1) {
            this._products.push(product);
        } else {
            this._products[id].quantity += product.quantity;
        }

    }

    deleteProductById(id: number) {
        this._products = this._products.filter(product => product.id !== id)
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

    emptyCart() {
        this._products.length = 0;
    }
}
