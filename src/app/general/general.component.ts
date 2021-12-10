import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
    isWaiting = false;
    constructor() {}

    ngOnInit(): void {}
    giveUp() {
        //vide le tableau des produits
    }
    pause() {
        this.isWaiting = true;
        //stocke la liste des produits en local storage
        //vide le tableau des produits
    }
    play() {
        this.isWaiting = false;
        //vide le tableau des produit
        //rempli la liste des produits avec ceux stocké en local storage
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
}
