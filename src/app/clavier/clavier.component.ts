import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
import { GeneralComponent } from '../general/general.component';
import { ProductCart } from '../product-cart';
import { State } from '../state.enum';

@Component({
    selector: 'app-clavier',
    templateUrl: './clavier.component.html',
    styleUrls: ['./clavier.component.scss'],
})
export class ClavierComponent implements OnInit {
    currentState: string;
    status = 'espece';
    totalPrice = 100;
    productFound: boolean;
    codeControl = new FormControl();
    enterQte = 12;
    valueClavier = '';
    productOK = true;
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
    }

    ngOnInit(): void {}

    onKeyup(e) {
        this.stateService.checkState(
            this.stateWaitForScan,
            this.stateWaitForCode,
            e.key != '',
            null
        );
        this.codeControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((codeValue) => {
                this.stateService.checkState(
                    this.stateWaitForCode,
                    this.stateFindProduct,
                    codeValue.length === 4,
                    this.getProduct(codeValue)
                );
            });
    }
    unknowProdcut() {
        this.stateService.checkState('waitScan', 'selectProduct', true, null);
    }
    validCode() {
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

    afterProductFind() {
        this.cartService.cartChanged$;
        console.log('Produit trouvé');
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
                this.valueClavier
            )
        );
        return true;
    }

    getProduct(code) {
        //code exist dans prodcutlist?
        //if(productexist)
        this.productFound = true;
        // else
        // this.productFound = false;
    }

    addProductQte(qte) {}

    clavierNumber(number) {
        this.valueClavier += number;
        this.validClavier();
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
            this.validCode()
        );
        // Close modal
        this.closeModalUnknownProduct.nativeElement.click();
    }
}
