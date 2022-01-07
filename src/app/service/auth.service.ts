import { Injectable } from "@angular/core";

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

    async getAuth(): Promise<boolean> {
        return this._userLogged;
    }

    async login(code: string): Promise<boolean> {
        if (code === "1234") {
            this._userLogged = true;
            return true;
        } else {
            return false;
        }
    }
}
