import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductCart } from "../product-cart";
import { CartService } from "../service/cart.service";
import Swal from "sweetalert2";
import { Cart } from "../cart";
import { StateService } from "../service/state.service";

@Component({
    selector: "app-general",
    templateUrl: "./general.component.html",
    styleUrls: ["./general.component.scss"]
})
export class GeneralComponent implements OnInit {
    static scanProduct = false;
    isWaiting = false;
    totalPrice = 0;
    currentState: string;
    cart: Cart = new Cart();
    paymentSelected: string = null;
    isCash: boolean = false;
    @ViewChild("closeModal") closeModal;

    constructor(
        private cartService: CartService,
        private stateService: StateService
    ) {
        this.cartService.cartChanged$.subscribe((cart) => {
            this.totalPrice = cart.products.reduce(
                (accumulateur, valeurCourante) =>
                    accumulateur +
                    valeurCourante.price * valeurCourante.quantity,
                0
            );
            this.cart = cart;
        });

        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });
    }

    ngOnInit(): void {
    }

    //PAIEMENT

    //   checkState('chosePayMode','amountToPay', (cardSelected || chequeSelected || cashSelected) && payerPartBtnSelected);
    //   checkState('amountToPay','chosePayMode', enterAmount && amount<totalPaiement);
    //   checkState('amountToPay','waitScan', enterAmount && amount==totalPaiement);

    //   checkState('chosePayMode','cashAmount',cashSelected && payerBtnSelected);
    //   checkState('cashAmount','cashOut',enterAmount && cashAmount>totalPaiement );
    //   checkState('cashOut','waitScan',selectCashOutBtn );

    giveUp() {
        this.cartService.emptyCart();
    }

    pause() {
        //MISE EN ATTENTE
        this.stateService.checkState(
            "waitScan",
            "miseEnAttente",
            true,
            this.stockProductList()
        );

        this.isWaiting = true;
        this.cartService.putCartInWait();
    }

    play() {
        this.stateService.checkState(
            "miseEnAttente",
            "waitSwan",
            true,
            this.recupProductList()
        );
        this.isWaiting = false;
        this.cartService.stopCartInWait();
    }

    stockProductList() {
    }

    recupProductList() {
    }

    pay() {
        this.stateService.checkState(
            "waitScan",
            "choosePayMode",
            this.totalPrice !== 0,
            this.openPayPopUp()
        );
    }

    openPayPopUp() {
        //MODAL A IMPLEMENTER
        Swal.fire({
            title: "Choose your payment method",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Credit card",
            denyButtonText: `Cash`
        }).then((result) => {
            if (result.isConfirmed) {
                // this.stateService.checkState(
                //     'chosePayMode',
                //     'waitScan',
                //     (cardSelected || chequeSelected) && payerBtnSelected,
                //     null
                // );
                Swal.fire("Success paiement card", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Success paiement cash", "", "info");
            }
        });
    }

    scanProductA() {
        const p = new ProductCart(1, "Tronconneuse", 99.0, 1);
        this.cartService.addProduct(p);
        GeneralComponent.scanProduct = true;
    }

    scanProductB() {
        const p = new ProductCart(2, "Perceuse", 50.0, 1);
        this.cartService.addProduct(p);
        GeneralComponent.scanProduct = true;
    }

    isEmpty() {
        return this.cartService.isEmpty();
    }

    changeToPaid() {
        if (this.paymentSelected === "CB" || this.paymentSelected === "check") {
            Swal.fire("Success paiement card", "", "success");
            this.cartService.emptyCart();
            this.closeModal.nativeElement.click();
        } else if (this.paymentSelected === "cash") {
            this.isCash = true;
            this.closeModal.nativeElement.click();
        }
    }
}
