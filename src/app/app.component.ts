import { Component, OnInit } from '@angular/core';
import { Product } from './product';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'ScanUP';

    products: Product[] = [];

    cart = [{ idProduct: 1, price: 20, quantity: 2 }];
    total = 0;
    customer = { type: '', amount: 0 };

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
        this.changeQuantity();
        this.scanProduct();
        this.scanProduct();
        this.addProductByScan(3);
        this.Pay();
    }

    // Arnaud
    changeQuantity() {
        const newProduct = new Product(1, 'name', 100, 1);
        this.products.push(newProduct);
        let index = 0;
        this.products[index].quantity = 4;
        console.log('change product quantity', this.products[index]);
    }

    // Alex
    scanProduct() {
        const newProduct = new Product(1, 'name', 100, 1);
        this.products.push(newProduct);
        console.log('add product manually', this.products);
    }

    // Julie
    addProductByScan(productId: number) {
        const p = new Product(5, 'Patate', 10, 1);
        if (p.id === productId) {
            this.products.push(p);
            console.log('Ajouter un produit au code : OK');
        } else {
            console.log('Ajouter un produit au code : KO');
        }
    }
    //Emma
    ChoosePayementMode() {
        this.customer = { type: 'CB', amount: 18 };
    }
    Pay() {
        this.cart.forEach((elmt) => {
            this.total = +elmt.price * elmt.quantity;
        });
        do {
            this.ChoosePayementMode();
            this.total = this.total - this.customer.amount;
        } while (this.total > 0);

        if (this.total > 0) {
            console.log('Reste à payer: ' + this.total);
        } else {
            console.log('Montant à rendre: ' + this.total);
        }
    }
}
