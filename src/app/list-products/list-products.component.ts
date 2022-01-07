import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../service/cart.service';
import { StateService } from '../service/state.service';
import { State } from '../state.enum';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
    cart: Cart = new Cart();
    idEdit: number;
    currentState: string;

    productId: number;
    productList = [
    ];

    stateWaitForScan: State = State.WaitForScan;
    stateEditProduct: State = State.EditProduct;

    constructor(
        private cartService: CartService,
        private stateService: StateService
    ) {
        this.cartService.cartChanged$.subscribe((cart) => {
            this.productList = cart.products;
        });

        this.stateService.currentStateChanged$.subscribe((state) => {
            if (this.stateService.idEdit) {
                this.idEdit = this.stateService.idEdit;
                this.currentState = state;
            }
        })
    }

    ngOnInit(): void { }

    deleteProduct(id) {
        this.cartService.deleteProduct(id);
    }

    editMode(id) {
        this.stateService.checkState(
            this.stateWaitForScan,
            this.stateEditProduct,
            true,
            this.stateService.setIdEdit(id)
        );
    }

    getProductId(productId) {
        this.productId = productId;
    }

    isInEdit(id: number) {
        if (this.currentState === State.SelectAmount || this.currentState === State.EditProduct) {
            if (this.idEdit === id) {
                return true;
            }
        }
        return false;
    }
}
