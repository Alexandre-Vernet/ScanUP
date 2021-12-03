import { Component, OnInit } from "@angular/core";
import { Product } from "./product";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "ScanUP";

    products: Product[] = [];

cart=[{idProduct:1,price:20, quantity:2}];
total=0;
customer={type:'CB', amount:18};


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

    scanProduct(product) {
        this.products.push(product);
    }

    // Alex
    addProductManually() {
        const new;
        Product(1, "nouveau produit");
    }
      //Emma
      ChoosePayementMode(){}
  Pay(){
      this.cart.forEach(elmt =>{
          this.total=+elmt.price*elmt.quantity;
      })
      do {
        this.ChoosePayementMode(); 
        this.total=this.total-this.customer.amount;
      } while (this.total > 0);

     if(this.total >0){
        console.log("Reste à payer: "+ this.total);
     }else{
        console.log("Montant à rendre: "+ this.total);
     }

  
    
  }
}
