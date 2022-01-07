import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { CartService } from "../service/cart.service";
import { StateService } from "../service/state.service";
import { AuthService } from "../service/auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
    currentState: string;
    status = "espece";
    totalPrice = 100;
    codeControl = new FormControl();
    enterQte = 12;
    valueClavier = "";
    loginOK = true;

    constructor(
        private stateService: StateService,
        private cartService: CartService,
        private router: Router,
        private auth: AuthService
    ) {
    }

    ngOnInit(): void {
    }

    clavierNumber(number) {
        this.valueClavier += number;
        this.validClavier();
    }

    validClavier() {
        this.codeControl.setValue(this.valueClavier);
    }

    login(code): void {
        this.auth.login(code.value).then(async (auth) => {
            if (auth) {
                this.loginOK = true;
                await this.router.navigateByUrl("/general");
            } else {
                this.loginOK = false;
            }
        });
    }

    clearForm() {
        this.codeControl.setValue("");
    }
    clear() {
        this.codeControl.setValue(null);
        this.valueClavier = '';
    }
}
