import {
    Component,
    Inject,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';
import { Cart } from '../cart';
import { StateService } from '../service/state.service';
import { State } from '../state.enum';
import { ProductsService } from '../service/products.service';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss'],
})
export class GeneralComponent {
    static scanProduct = false;
    isWaiting = false;
    subtotal = 0;
    totalPrice = 0;
    owedMoney = 0;
    currentState: string;
    cart: Cart = new Cart();
    paymentSelected: string = null;

    isCashBool: boolean = false;
    payPartBool = false;

    @ViewChild('closeModal') closeModal;

    stateWaitForScan: State = State.WaitForScan;
    statePutOnHold: State = State.PutOnHold;
    stateChoosePayMode: State = State.ChoosePayMode;
    stateSelectAmount: State = State.SelectAmount;

    constructor(
        private cartService: CartService,
        private stateService: StateService,
        private productService: ProductsService
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
        this.stateService.checkState('', this.stateWaitForScan, true, null);
        this.stateService.currentStateChanged$.subscribe((state)=>{
            this.currentState = state;
        })
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
        this.stateService.checkState(
            this.stateWaitForScan,
            this.statePutOnHold,
            true,
            this.stockProductList()
        );

        this.isWaiting = true;
        this.cartService.putCartInWait();
    }

    play() {
        this.stateService.checkState(
            this.statePutOnHold,
            this.stateWaitForScan,
            true,
            this.recupProductList()
        );
        this.isWaiting = false;
        this.cartService.stopCartInWait();
    }

    stockProductList() { }

    recupProductList() { }

    pay() {
        this.stateService.checkState(
            this.stateWaitForScan,
            this.stateChoosePayMode,
            this.totalPrice !== 0,
            null //remplacer par l'ouverture du pop up
        );
    }

    openPayPopUp() {
        //MODAL A IMPLEMENTER
        Swal.fire({
            title: 'Choose your payment method',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Credit card',
            denyButtonText: `Cash`,
        }).then((result) => {
            if (result.isConfirmed) {
                // this.stateService.checkState(
                //     'chosePayMode',
                //     'waitScan',
                //     (cardSelected || chequeSelected) && payerBtnSelected,
                //     null
                // );
                Swal.fire('Paiement effectué', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Success paiement cash', '', 'info');
            }
        });
    }

    scanProduct(id: number) {
        console.log(this.currentState)

        const product = this.productService.checkProductExist(id);
        if(!product){
            console.log('ERROR !');
            return;
        }

        this.cartService.addProduct(product);
        GeneralComponent.scanProduct = true;

        
        if(this.currentState === State.SelectAmount){
            this.stateService.checkState(
                this.stateSelectAmount,
                this.stateWaitForScan,
                true,
                null
            );
        }
    }

    /*scanProductB() {
        const p = new ProductCart(2, 'Perceuse', 50.0, 1);
        this.cartService.addProduct(p);
        GeneralComponent.scanProduct = true;
    }*/

    isEmpty() {
        return this.cartService.isEmpty();
    }

    changeToPaid() {
        if (this.paymentSelected === 'CB' || this.paymentSelected === 'check') {
            Swal.fire('Paiement effectué', '', 'success');
            this.cartService.emptyCart();
            this.subtotal = 0;
            this.totalPrice = 0;
            this.owedMoney = 0;
            this.isCashBool = false;
            this.closeModal.nativeElement.click();
        } else if (this.paymentSelected === 'cash' && this.owedMoney === 0) {
            this.isCashBool = true;
            this.closeModal.nativeElement.click();
        }
    }

    payPart() {
        this.payPartBool = !this.payPartBool;
    }

    changeSubtotal(number) {
        if (this.payPartBool && number < this.totalPrice - this.subtotal) {
            this.subtotal += number;
            this.payPartBool = false;
        } else if (
            this.payPartBool &&
            number === this.totalPrice - this.subtotal
        ) {
            Swal.fire('Paiement effectué', '', 'success');
            this.cartService.emptyCart();
            this.subtotal = 0;
            this.totalPrice = 0;
            this.payPartBool = false;
        } else if (
            this.isCashBool &&
            number > this.totalPrice - this.subtotal
        ) {
            this.owedMoney = number - (this.totalPrice - this.subtotal);
        }
    }
}
