<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
=======
import {Component, Inject, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
>>>>>>> 49bb0910e7725597fa89f15f28367e6bc8306938
import { FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import { debounceTime } from 'rxjs/operators';
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
    @Output() paidPartEvent = new EventEmitter<number>();

    @ViewChild('closeModalUnknownProduct') closeModalUnknownProduct;

    constructor(
        private stateService: StateService,
        private cartService: CartService,
        @Inject(String) public stateEnum = State
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

    onKeyup(e) {
<<<<<<< HEAD
        /*
        if (this.currentState === 'waitScan') {
            this.stateService.checkState(
                'waitScan',
                'waitForCode',
                e.key != '',
                null
            );
        }
        //pour la recherche de produit on a le bouton "OK" ?
=======
        this.stateService.checkState(
            this.stateEnum.WaitForScan,
            this.stateEnum.WaitForCode,
            e.key != '',
            null
        );
>>>>>>> 49bb0910e7725597fa89f15f28367e6bc8306938
        this.codeControl.valueChanges
            .pipe(debounceTime(100))
            .subscribe((codeValue) => {
                this.stateService.checkState(
                    this.stateEnum.WaitForCode,
                    this.stateEnum.FindProduct,
                    codeValue.length === 4,
                    this.getProduct(codeValue)
                );
            });*/
    }
    unknowProdcut() {
        this.stateService.checkState('waitScan', 'selectProduct', true, null);
    }

    validCode() {
        this.stateService.checkState(
            this.stateEnum.FindProduct,
            this.stateEnum.ErrorUnknowPdt,
            !this.productFound,

            this.stateService.checkState(
                this.stateEnum.ErrorUnknowPdt,
                this.stateEnum.WaitForScan,
                true,
                (this.productOK = false)
            )
        );
        this.stateService.checkState(
            this.stateEnum.FindProduct,
            this.stateEnum.SelectAmount,
            this.productFound,
            this.afterProductFind()
        );
    }

    afterProductFind() {
        console.log('Produit trouvé');
        this.clear();
        //add snackbar
        this.productOK = true;
        this.stateService.checkState(
            this.stateEnum.SelectAmount,
            this.stateEnum.WaitForScan,
            true,
            // GeneralComponent.scanProduct,
            this.addProductQte(1)
        );
        this.stateService.checkState(
            this.stateEnum.SelectAmount,
            this.stateEnum.WaitForScan,
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
        this.stateService.checkState(
            this.stateEnum.EditProduct,
            this.stateEnum.WaitForScan,
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
            this.stateEnum.SelectProduct,
            this.stateEnum.FindProduct,
            true,
            this.clear()
            //this.validCode()
        );
        // Close modal
        this.closeModalUnknownProduct.nativeElement.click();
    }

}
