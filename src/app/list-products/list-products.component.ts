import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
    cart: Cart = new Cart();
    productList = [
        {
            id: 1,
            name: 'Tronçonneuse électrique RCS2340B2C 2300W 40cm - RYOBI',
            price: 99.9,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Ratelier de 9 clés torx 1,5 à 10mm chrome vanadium - INVENTIV',
            price: 12.5,
            quantity: 2,
        },
        {
            id: 3,
            name: 'Rénovateur brillant Star longue durée tous sols intérieurs Starwax 1L',
            price: 17.95,
            quantity: 2,
        },
        {
            id: 4,
            name: 'Peinture sol trafic extrême satin 0.5L - Rouge brique - V33',
            price: 24.9,
            quantity: 2,
        },
    ];
    constructor() {}

    ngOnInit(): void {}
    deleteProduct(id) {
        this.cart.deleteProductById(1);
    }
}
