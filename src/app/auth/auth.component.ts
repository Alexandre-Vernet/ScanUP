import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { StateService } from '../service/state.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    currentState: string;
    status = 'espece';
    totalPrice = 100;
    productFound: boolean;
    codeControl = new FormControl();
    enterQte = 12;
    valueClavier = '';
    loginOK = true;
    constructor(
        private stateService: StateService,
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    clavierNumber(number) {
        this.valueClavier += number;
        this.validClavier();
    }
    validClavier() {
        //if state ==
        this.codeControl.setValue(this.valueClavier);

        this.stateService.checkState(
            'edit',
            'waitScan',
            this.valueClavier != null,
            this.cartService.changeQuantity(
                this.stateService.idEdit,
                this.valueClavier
            )
        );
        return true;
    }
    login(code) {
        console.log(code.value);
        if (code.value === '1234') {
            this.router.navigateByUrl('/general');
        } else {
            this.loginOK = false;
        }
    }
}
