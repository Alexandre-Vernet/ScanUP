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

        this.scanProduct();
    }


    // Alex
    scanProduct() {
        const newProduct = new Product(1, "name", 100, 1);
        this.products.push(newProduct);
        console.log("add product manually", this.products);
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
