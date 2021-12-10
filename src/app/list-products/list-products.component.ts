import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
    cart: Cart = new Cart();
    productList = [];
    constructor() {}

    ngOnInit(): void {}
    deleteProduct(id) {
        this.cart.deleteProductById(1);
    }
}
