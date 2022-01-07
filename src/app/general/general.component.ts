import {
	Component,
	OnInit,
	ViewChild
} from "@angular/core";
import { ProductCart } from "../product-cart";
import { CartService } from "../service/cart.service";
import Swal from "sweetalert2";
import { Cart } from "../cart";
import { StateService } from "../service/state.service";
import { State } from "../state.enum";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-general",
	templateUrl: "./general.component.html",
	styleUrls: ["./general.component.scss"]
})
export class GeneralComponent implements OnInit {
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

	@ViewChild("closeModal") closeModal;

    stateWaitForScan: State = State.WaitForScan;
    statePutOnHold: State = State.PutOnHold;
    stateChoosePayMode: State = State.ChoosePayMode;
    stateAmountToPay: State = State.AmountToPay;
    stateCashAmount: State = State.CashAmount;
    stateCashOut: State = State.CashOut;

	constructor(
		private cartService: CartService,
		private stateService: StateService,
		private auth: AuthService,
		private router: Router
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
		this.stateService.checkState("", this.stateWaitForScan, true, null);
	}

	ngOnInit(): void {
		// If log
		this.auth.getAuth().then((user) => {
			if (!user) {
				this.router.navigateByUrl("/");
			}
		});
		this.stateService.currentStateChanged$.subscribe((data) => {
			this.currentState = data;
		});
	}

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

	stockProductList() {
	}

	recupProductList() {
	}

    pay() {
        if (this.owedMoney === 0) {
            this.stateService.checkState(
                this.stateWaitForScan,
                this.stateChoosePayMode,
                this.totalPrice !== 0,
                null //remplacer par l'ouverture du pop up
            );
            this.stateService.checkState(
                this.stateAmountToPay,
                this.stateChoosePayMode,
                this.totalPrice !== 0,
                null //remplacer par l'ouverture du pop up
            );
        } else {
            this.stateService.checkState(
                this.stateCashAmount,
                this.stateCashOut,
                this.totalPrice !== 0,
                null //remplacer par l'ouverture du pop up
            );
        }
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
				Swal.fire("Paiement effectué", "", "success");
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
        if (this.paymentSelected === 'CB' || this.paymentSelected === 'check') {
            this.stateService.checkState(
                this.stateChoosePayMode,
                this.stateWaitForScan,
                true,
                Swal.fire('Paiement effectué', '', 'success')
            );
            this.cartService.emptyCart();
            this.subtotal = 0;
            this.totalPrice = 0;
            this.owedMoney = 0;
            this.isCashBool = false;
            this.closeModal.nativeElement.click();
        } else if (this.paymentSelected === 'cash' && this.owedMoney === 0) {
            this.stateService.checkState(
                this.stateChoosePayMode,
                this.stateCashAmount,
                true,
                (this.isCashBool = true)
            );
            this.closeModal.nativeElement.click();
        } else if (this.owedMoney !== 0) {
            this.stateService.checkState(
                this.stateCashOut,
                this.stateWaitForScan,
                true,
                Swal.fire('Paiement effectué', '', 'success')
            );
            this.closeModal.nativeElement.click();
            this.cartService.emptyCart();
            this.subtotal = 0;
            this.totalPrice = 0;
            this.owedMoney = 0;
        }
    }

    payPart() {
        this.stateService.checkState(
            this.stateChoosePayMode,
            this.stateAmountToPay,
            true,
            (this.payPartBool = !this.payPartBool)
        );
    }

	changeSubtotal(number) {
		if (this.payPartBool && number < this.totalPrice - this.subtotal) {
			this.subtotal += number;
			this.payPartBool = false;
		} else if (
			this.payPartBool &&
			number === this.totalPrice - this.subtotal
		) {
			Swal.fire("Paiement effectué", "", "success");
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
