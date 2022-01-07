import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private _userLogged: boolean = false;

    get userLogged(): boolean {
        return this._userLogged;
    }

    set userLogged(value: boolean) {
        this._userLogged = value;
    }

    constructor(
        private router: Router
    ) {
    }

    async getAuth(): Promise<boolean> {
        return this._userLogged;
    }

    async login(code: string): Promise<boolean> {
        if (code === "1234") {
            this._userLogged = true;
            localStorage.setItem("userLogged", "true");
            return true;
        } else {
            return false;
        }
    }

    async disconnect() {
        // Disconnect
        this.userLogged = false;

        // Redirect to login page
        await this.router.navigateByUrl("/");

        localStorage.removeItem("userLogged");
    }
}
