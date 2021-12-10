import { Component, OnInit } from '@angular/core';
import { ProductCart } from '../product-cart';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
    isWaiting = false;
    totalPrice = 0;

    constructor(private cartService: CartService) {
        this.cartService.cartChanged$.subscribe((cart) => {
            this.totalPrice = cart.products.reduce(
                (accumulateur, valeurCourante) => accumulateur + valeurCourante.price * valeurCourante.quantity, 0
            )
        })
    }

    ngOnInit(): void { }

    giveUp() {
        this.cartService.emptyCart();
    }

    pause() {
        this.isWaiting = true;
        this.cartService.putCartInWait();
    }

    play() {
        this.isWaiting = false;
        this.cartService.stopCartInWait();
    }

    pay() {
        //si listproduit.length !==0 open pop up moyen de paiement

        Swal.fire({
            title: 'Choose your payment method',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Credit card',
            denyButtonText: `Cash`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Success paiement card', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Success paiement cash', '', 'info')
            }
        })
    }

    scanProductA() {
        const p = new ProductCart(1, "Tronconneuse", 99.00, 1);
        this.cartService.addProduct(p);
    }

    scanProductB() {
        const p = new ProductCart(2, "Perceuse", 50.00, 1);
        this.cartService.addProduct(p);
    }

    isEmpty() {
        return this.cartService.isEmpty();
    }
}
