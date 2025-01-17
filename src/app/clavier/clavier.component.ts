import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import { CartService } from '../service/cart.service';
import { State } from '../state.enum';
import { ProductsService } from '../service/products.service';
import Swal from 'sweetalert2';

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
    idToFind: number;

    productList = this.productService.productList();

    @Input() payPart: boolean;
    @Input() payMethod: string;
    @Output() paidPartEvent = new EventEmitter<number>();

    @ViewChild('closeModalUnknownProduct') closeModalUnknownProduct;

    stateWaitForScan: State = State.WaitForScan;
    stateWaitForCode: State = State.WaitForCode;
    stateFindProduct: State = State.FindProduct;
    stateSelectProduct: State = State.SelectProduct;
    stateErrorUnknowPdt: State = State.ErrorUnknowPdt;
    stateSelectAmount: State = State.SelectAmount;
    stateEditProduct: State = State.EditProduct;
    stateCashAmount: State = State.CashAmount;
    codeTab = [];

    constructor(
        private stateService: StateService,
        private cartService: CartService,
        private productService: ProductsService
    ) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;

            if (this.currentState === State.FindProduct) {
                this.findProduct(this.idToFind);
            }
        });

        this.codeControl.valueChanges.subscribe((inputValue) => {
            if (!inputValue) {
                return;
            }

            if (this.currentState === State.WaitForScan) {
                this.stateService.checkState(
                    this.stateWaitForScan,
                    this.stateWaitForCode,
                    inputValue != '',
                    null
                );
            }
        });
        this.productList.forEach((element) => {
            this.codeTab.push(element.code);
        });
    }

    unknowProdcut() {
        this.stateService.checkState(
            this.stateWaitForScan,
            this.stateSelectProduct,
            true,
            null
        );
    }

    validCode() {
        // si on paie une partie
        if (
            this.payPart &&
            this.valueClavier !== '' &&
            typeof parseInt(this.valueClavier) === 'number'
        ) {
            this.cartService.addPaimentAction(`${this.payMethod} ${this.valueClavier}`);
            this.paidPartEvent.emit(parseInt(this.valueClavier));
            this.valueClavier = '';
            this.codeControl.setValue('');
        }

        //si on paie en cash
        if (
            this.payMethod === 'cash' &&
            this.valueClavier !== '' &&
            typeof parseInt(this.valueClavier) === 'number'
        ) {
            this.cartService.addPaimentAction(`cash ${this.valueClavier}`);
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
        }
        //si state= wait for code
        this.stateService.checkState(
            this.stateWaitForCode,
            this.stateFindProduct,
            true,
            (this.idToFind = +this.codeControl.value)
        );
        this.clear();
    }

    clear() {
        if (this.currentState === State.WaitForCode) {
            this.stateService.checkState(
                this.stateWaitForCode,
                this.stateWaitForScan,
                this.valueClavier != null,
                null
            );
        }
        this.codeControl.setValue(null);
        this.valueClavier = '';
    }

    validClavier() {
        this.codeControl.setValue(this.valueClavier);

        switch (this.currentState) {
            case State.EditProduct:
                this.stateService.checkState(
                    this.stateEditProduct,
                    this.stateWaitForScan,
                    this.valueClavier != null,
                    this.cartService.changeQuantity(
                        this.stateService.idEdit,
                        +this.valueClavier
                    )
                );
                break;

            case State.SelectAmount:
                this.stateService.checkState(
                    this.stateSelectAmount,
                    this.stateWaitForScan,
                    this.valueClavier != null,
                    this.cartService.changeQuantity(
                        this.stateService.idEdit,
                        +this.valueClavier
                    )
                );
                break;

            default:
                break;
        }

        this.clear();
        return true;
    }

    clavierNumber(number) {
        this.valueClavier += number;
        this.codeControl.setValue(this.valueClavier);
    }

    addToCart(id: number) {
        // State
        this.stateService.checkState(
            this.stateSelectProduct,
            this.stateFindProduct,
            true,
            (this.idToFind = id)
        );

        // Close modal
        this.closeModalUnknownProduct.nativeElement.click();
    }

    findProduct(id: number) {
        if (!id) {
            return;
        }
        //on regarde si le produit sélectionné / entré existe
        const product = this.productService.checkProductExist(id);
        //si il existe pas
        if (!product.id) {
            this.stateService.checkState(
                this.stateFindProduct,
                this.stateErrorUnknowPdt,
                true,
                Swal.fire('Produit non trouvé', '', 'error')
            );
            this.stateService.checkState(
                this.stateErrorUnknowPdt,
                this.stateWaitForScan,
                true,
                null
            );
        } else {
            //si il existe
            this.cartService.addProduct(product);
            this.stateService.idEdit = id;

            this.stateService.checkState(
                this.stateFindProduct,
                this.stateSelectAmount,
                true,
                null
            );
        }
    }

    onCloseModal() {
        this.stateService.checkState(
            this.stateSelectProduct,
            this.stateWaitForScan,
            true,
            null
        );
    }
}
