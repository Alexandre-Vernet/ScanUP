import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ScanUP';

  ngOnInit() {
    // Scanner un produit
    // Modifer la quantité
    // Supprimer produit au scan
    // Ajouter un produit au code
    //Payer d'un coup
    //Payer en plusieurs fois
    //Payer en espèce
  }
}
