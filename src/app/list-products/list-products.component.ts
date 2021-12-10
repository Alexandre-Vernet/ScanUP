import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../service/cart.service';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
    cart: Cart = new Cart();
    productList = [];
    constructor(private cartService: CartService) {
        this.cartService.cartChanged$.subscribe((cart) => {
            this.productList = cart.products;
        })

    }

    ngOnInit(): void { }
    deleteProduct(id) {
        this.cartService.deleteProduct(id);
    }
}
