import { Component, OnInit } from "@angular/core";
import { Cart } from "./cart";
import { ProductCart } from "./product-cart";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    cart: Cart = new Cart();

    total = 0;
    customer = { type: "", amount: 0 };

    ngOnInit() {
        this.scanProduct();
        this.changeQuantity();
        this.scanProduct();
        this.scanProduct();
        this.cart.deleteProductById(1);
        this.addProductByScan(3);
        this.pay();
    }

    // Arnaud
    changeQuantity() {
        const product = this.cart.getById(1);
        product.quantity = 4;
        console.log("change product quantity", product);
    }

    // Alex
    scanProduct() {
        const productCart = new ProductCart(1, "name", 100, 1);
        this.cart.addProduct(productCart);
        console.log("add product manually", productCart);
    }

    // Julie
    addProductByScan(productId: number) {
        const p = new ProductCart(5, "Patate", 10, 1);
        if (p.id === productId) {
            this.cart.addProduct(p);
            console.log("Ajouter un produit au code : OK");
        } else {
            console.log("Ajouter un produit au code : KO");
        }
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
