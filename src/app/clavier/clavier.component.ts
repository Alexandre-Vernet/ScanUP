import {Component, Inject, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
import { GeneralComponent } from '../general/general.component';
import { ProductCart } from '../product-cart';
import { State } from '../state.enum';
import {parse} from "@angular/compiler/src/render3/view/style_parser";

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

    @Input() payPart: boolean;
    @Input() isCash: boolean;
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
    }

    ngOnInit(): void {}

    onKeyup(e) {
        this.stateService.checkState(
            this.stateEnum.WaitForScan,
            this.stateEnum.WaitForCode,
            e.key != '',
            null
        );
        this.codeControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((codeValue) => {
                this.stateService.checkState(
                    this.stateEnum.WaitForCode,
                    this.stateEnum.FindProduct,
                    codeValue.length === 4,
                    this.getProduct(codeValue)
                );
            });
    }
    unknowProdcut() {
        this.stateService.checkState('waitScan', 'selectProduct', true, null);
    }
    validCode() {
        if (this.payPart && this.valueClavier !== '' && typeof parseInt(this.valueClavier) === 'number') {
            this.paidPartEvent.emit(parseInt(this.valueClavier));
            this.valueClavier = '';
            this.codeControl.setValue('');
        }
        if (this.isCash && this.valueClavier !== '' && typeof parseInt(this.valueClavier) === 'number') {
            this.paidPartEvent.emit(parseInt(this.valueClavier));
            this.valueClavier = '';
            this.codeControl.setValue('');
        }
        else {
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
    }

    afterProductFind() {
        this.cartService.cartChanged$;
        console.log('Produit trouvé');
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
        this.codeControl.setValue(this.valueClavier);

        this.stateService.checkState(
            this.stateEnum.EditProduct,
            this.stateEnum.WaitForScan,
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
            this.stateEnum.SelectProduct,
            this.stateEnum.FindProduct,
            true,
            this.validCode()
        );

        // Close modal
        this.closeModalUnknownProduct.nativeElement.click();
    }
}
