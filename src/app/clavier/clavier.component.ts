import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-clavier',
    templateUrl: './clavier.component.html',
    styleUrls: ['./clavier.component.scss'],
})
export class ClavierComponent implements OnInit {
    status = 'espece';
    totalPrice = 100;
    constructor() {}

    ngOnInit(): void {}
    searchProduct() {
        Swal.fire({
            title: 'Choisissez votre produit',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Produit 1',
            denyButtonText: `Produit 2`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Produit 1 ajouté', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Produit 2 ajouté', '', 'success');
            }
        });
    }
    clavierNumber(number) {
        if (this.status === 'espece') {
            Swal.fire({
                title: 'Somme a rendre : ' + (this.totalPrice - number) + ' €',
                showCancelButton: true,
                confirmButtonText:
                    'Rendre ' + (this.totalPrice - number) + ' €',
            });
        } else if (this.status === 'editQuantity') {
        } else if (this.status === 'splitPayment') {
        }
    }
}
