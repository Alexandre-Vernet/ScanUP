import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import { debounceTime } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
import { ProductCart } from '../product-cart';

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
    @ViewChild('closeModalUnknownProduct') closeModalUnknownProduct;

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

    onKeyup(e) {
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
        this.codeControl.valueChanges
            .pipe(debounceTime(100))
            .subscribe((codeValue) => {
                this.stateService.checkState(
                    'waitForCode',
                    'findProduct',
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
            'findProduct',
            'ErrorUnknowPdt',
            !this.productFound,
            //console.log('Produit non trouvé')
            //add snabar
            this.stateService.checkState(
                'ErrorUnknowPdt',
                'waitScan',
                true,
                null
            )
        );
        this.stateService.checkState(
            'findProduct',
            'selectAmount',
            this.productFound,
            this.afterProductFind()
        );
    }

    afterProductFind() {
        console.log('Produit trouvé');
        this.clear();
        //add snackbar
        this.stateService.checkState(
            'selectAmount',
            'waitScan',
            true,
            // GeneralComponent.scanProduct,
            this.addProductQte(1)
        );
        this.stateService.checkState(
            'selectAmount',
            'waitScan',
            true,//this.validClavier(),
            this.addProductQte(this.enterQte)
        );
    }

    validClavier() {
        //if state ==
        this.stateService.checkState(
            'edit',
            'waitScan',
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
            'selectProduct',
            'findProduct',
            true,
            this.clear()
            //this.validCode()
        );
        // Close modal
        this.closeModalUnknownProduct.nativeElement.click();
    }

    clear() {
        this.valueClavier = '';
        this.codeControl.setValue('');
    }

}
