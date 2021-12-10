import { Component, OnInit } from '@angular/core';

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
    }
}
