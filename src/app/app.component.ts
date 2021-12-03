import { Component, OnInit } from "@angular/core";
import { Cart } from "./cart";
import { ProductCart } from "./product-cart";
import { Product } from "./product";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    cart: Cart = new Cart();
    products: Product[] = [];

    total = 0;
    customer = { type: "", amount: 0 };

    ngOnInit() {
        this.scanProduct(123);
        this.changeQuantity();
        this.scanProduct(456);
        this.scanProduct(789);
        this.cart.deleteProductById(1);
        this.pay();
    }

    changeQuantity() {
        const product = this.cart.getById(1);
        product.quantity = 4;
        console.log("change product quantity", product);
    }

    addProductCart(product: ProductCart) {
        this.cart.addProduct(product);
        console.log("add product manually", product);
    }

    scanProduct(code: number) {
        const exist = this.products.find((x) => {
            code === x.id;
        });

        if (exist) {
            const newProductCart = new ProductCart(exist.id, exist.name, exist.price, 1);
            this.addProductCart(newProductCart);
        }
    }

    choosePaymentMode(type: string, amount: number) {
        this.customer = { type, amount };
    }

    pay() {
        this.cart.products.forEach((element: ProductCart) => {
            this.total += element.price * element.quantity;
        });
        do {
            this.choosePaymentMode("CB", 18);
            this.total = this.total - this.customer.amount;
        } while (this.total > 0);

        if (this.total > 0) {
            console.log("Reste à payer: " + this.total);
        } else {
            console.log("Montant à rendre: " + this.total);
        }
    }
}
