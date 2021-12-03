import {Component, OnInit} from "@angular/core";
import {Product} from "./product";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "ScanUP";

    products: Product[] = [];

    ngOnInit() {
        // Scanner un produit
        // Modifer la quantité
        // Scanner un autre produit
        // Scanner un autre produit
        // Supprimer produit au scan
        // Ajouter un produit au code
        //Payer en plusieurs fois
        //Payer un partie CB
        //Payer le reste en espèce
    }

    scanProduct(product) {
        this.products.push(product);
    }

    changeQuantity(index, qty) {
        this.products[index].quantity = qty;
    }

    // Alex
    addProductManually() {
        const new;
        Product(1, "nouveau produit");
    }
}
