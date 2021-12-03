import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'ScanUP';

    products = [];

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
    ScanProduct(product: any) {
        this.products.push(product);
    }
}
