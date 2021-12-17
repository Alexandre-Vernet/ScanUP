import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { StateService } from "../service/state.service";

@Component({
    selector: "app-clavier",
    templateUrl: "./clavier.component.html",
    styleUrls: ["./clavier.component.scss"]
})
export class ClavierComponent implements OnInit {
    currentState: string;
    status = "espece";
    totalPrice = 100;

    constructor(private stateService: StateService) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });
    }

    /*// CODE SEARCH

checkState('waitForCode','findProduct',code.length === 4);
checkState('findProduct','ErrorUnknowPdt',productNotFound);
checkState('ErrorUnknowPdt','waitScan');
checkState('findProduct','selectAmount',productFound);
checkState('selectAmount','waitScan',scanProduct,addProductQte1);
checkState('selectAmount','waitScan',enterQte, addProdcutQteEnter);

// MANUAL SEARCH
checkState('waitScan','selectProduct',selectPdtInconnu);
checkState('selectProduct','selectAmount',chooseProduct);*/

    ngOnInit(): void {
    }

    onKeyup(e) {
        console.log(e);
        // this.stateService.checkState(
        //     'waitScan',
        //     'waitForCode',
        //     'toto ',
        //     null
        // );
    }

    clavierNumber(number) {
        if (this.status === "espece") {
            Swal.fire({
                title: "Somme a rendre : " + (this.totalPrice - number) + " €",
                showCancelButton: true,
                confirmButtonText:
                    "Rendre " + (this.totalPrice - number) + " €"
            });
        } else if (this.status === "editQuantity") {
        } else if (this.status === "splitPayment") {
        }
    }

    addToCart() {

    }
}
