import { Component, OnInit } from "@angular/core";
import { Product } from "./product";

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

    // Alex
    addProductManually() {
        const new;
        Product(1, "nouveau produit");
    }

    // Julie
    addProductByScan(productId: number) {
        const p = new Product(5, 'Patate', 10, 1);
        if (p.id = productId) {
            this.products.push(p);
            console.log('Ajouter un produit au code : OK');
        } else {
            console.log('Ajouter un produit au code : KO');
        }
    }
}
