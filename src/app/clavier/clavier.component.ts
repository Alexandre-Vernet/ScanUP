import {
    Component,
    Inject,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import { CartService } from '../service/cart.service';
import { ProductCart } from '../product-cart';
import { State } from '../state.enum';


@Component({
    selector: 'app-clavier',
    templateUrl: './clavier.component.html',
    styleUrls: ['./clavier.component.scss'],
})
export class ClavierComponent {
    currentState: string;
    status = 'espece';
    totalPrice = 100;
    productFound: boolean;
    codeControl = new FormControl();
    enterQte = 12;
    valueClavier = '';
    productOK = true;

    @Input() payPart: boolean;
    @Input() isCash: boolean;
    @Output() paidPartEvent = new EventEmitter<number>();

    @ViewChild('closeModalUnknownProduct') closeModalUnknownProduct;

    stateWaitForScan: State = State.WaitForScan;
    stateWaitForCode: State = State.WaitForCode;
    stateFindProduct: State = State.FindProduct;
    stateSelectProduct: State = State.SelectProduct;
    stateErrorUnknowPdt: State = State.ErrorUnknowPdt;
    stateSelectAmount: State = State.SelectAmount;
    stateEditProduct: State = State.EditProduct;

    constructor(
        private stateService: StateService,
        private cartService: CartService
    ) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });

        this.codeControl.valueChanges.subscribe((inputValue)=>{
            if(!inputValue){
                return;
            }
            if (this.currentState === 'waitScan') {
                this.stateService.checkState(
                    'waitScan',
                    'waitForCode',
                    inputValue != '',
                    null
                );
            }
        })
    }

    unknowProdcut() {
        this.stateService.checkState('waitScan', 'selectProduct', true, null);
    }

    validCode() {
        if (
            this.payPart &&
            this.valueClavier !== '' &&
            typeof parseInt(this.valueClavier) === 'number'
        ) {
            this.paidPartEvent.emit(parseInt(this.valueClavier));
            this.valueClavier = '';
            this.codeControl.setValue('');
        }
        if (
            this.isCash &&
            this.valueClavier !== '' &&
            typeof parseInt(this.valueClavier) === 'number'
        ) {
            this.paidPartEvent.emit(parseInt(this.valueClavier));
            this.valueClavier = '';
            this.codeControl.setValue('');
        } else {
            this.stateService.checkState(
                this.stateFindProduct,
                this.stateErrorUnknowPdt,
                !this.productFound,

                this.stateService.checkState(
                    this.stateErrorUnknowPdt,
                    this.stateWaitForScan,
                    true,
                    (this.productOK = false)
                )
            );
            this.stateService.checkState(
                this.stateFindProduct,
                this.stateSelectAmount,
                this.productFound,
                this.afterProductFind()
            );
        }
    }

    afterProductFind() {
        console.log('Produit trouvé');
        this.clear();
        //add snackbar
        this.productOK = true;
        this.stateService.checkState(
            this.stateSelectAmount,
            this.stateWaitForScan,
            true,
            // GeneralComponent.scanProduct,
            this.addProductQte(1)
        );
        this.stateService.checkState(
            this.stateSelectAmount,
            this.stateWaitForScan,
            this.validClavier(),
            this.addProductQte(this.enterQte)
        );
    }

    clear() {
        this.codeControl.setValue(null);
        this.valueClavier = '';
    }

    validClavier() {
        //if state ==

        this.codeControl.setValue(this.valueClavier);
        this.stateService.checkState(
            this.stateEditProduct,
            this.stateWaitForScan,
            this.valueClavier != null,
            this.cartService.changeQuantity(
                this.stateService.idEdit,
                +this.valueClavier
            )
        );
        this.clear();
        return true;
    }

    getProduct(code) {
        //code exist dans prodcutlist?
        //if(productexist)
        this.productFound = true;
        // else
        // this.productFound = false;
    }

    addProductQte(qte) { }

    clavierNumber(number) {
        this.valueClavier += number;
        this.codeControl.setValue(this.valueClavier);
    }

    addToCart() {
        // Add product to cart
        const p = new ProductCart(1, 'Marteau quelconque', 99.0, 1);
        this.cartService.addProduct(p);

        // State
        this.productFound = true;
        this.stateService.checkState(
            this.stateSelectProduct,
            this.stateFindProduct,
            true,
            this.clear()
            //this.validCode()
        );
        // Close modal
        this.closeModalUnknownProduct.nativeElement.click();
    }

}
