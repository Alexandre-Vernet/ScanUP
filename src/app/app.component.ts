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
        this.scanProduct(new ProductCart(1, "name", 100, 1));
        this.changeQuantity();
        this.scanProduct(new ProductCart(44, "mandarine", 394, 69));
        this.scanProduct(new ProductCart(44, "mandarine2", 3944, 699));
        this.cart.deleteProductById(1);
        this.pay();
    }

    // Arnaud
    changeQuantity() {
        const product = this.cart.getById(1);
        product.quantity = 4;
        console.log("change product quantity", product);
    }

    // Alex
    addProductCart(product: ProductCart) {
        this.cart.addProduct(product);
        console.log("add product manually", product);
    }

    scanProduct(code: number) {
        this.products.find((x) => {
            code === x.id;
        });
        if (code.id === productId) {
            this.cart.addProduct(p);
            console.log("Ajouter un produit au code : OK");
        } else {
            console.log("Ajouter un produit au code : KO");
        }
    }

    // Julie
    addProductByCode(productId: number) {
        const p = new ProductCart(5, "Patate", 10, 1);

    }

    //Emma
    choosePayementMode() {
        this.customer = { type: "CB", amount: 18 };
    }

    pay() {
        this.cart.products.forEach((elmt) => {
            this.total = +elmt.price * elmt.quantity;
        });
        do {
            this.choosePayementMode();
            this.total = this.total - this.customer.amount;
        } while (this.total > 0);

        if (this.total > 0) {
            console.log("Reste à payer: " + this.total);
        } else {
            console.log("Montant à rendre: " + this.total);
        }
    }
}
