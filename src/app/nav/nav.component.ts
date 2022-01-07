import { Component, OnInit } from "@angular/core";
import { StateService } from "../service/state.service";
import * as moment from "moment";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
    currentState: string;
    myDate;

    constructor(private stateService: StateService,
                private auth: AuthService,
                private router: Router) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });
    }

    ngOnInit(): void {
        setInterval(() => {
            let now = new Date();
            this.myDate = moment(now).locale("fr").format("dddd DD/MM HH:mm");
        }, 1000);
    }

    backgroundColor(colorName: string) {
        document.body.style.backgroundColor = colorName;
    }

    async disconnect() {
        // Disconnect
        this.auth.userLogged = false;

        // Redirect to login page
        await this.router.navigateByUrl("/");
    }
}
