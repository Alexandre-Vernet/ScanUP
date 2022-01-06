import { Component, OnInit } from "@angular/core";
import { StateService } from "../service/state.service";
import * as moment from "moment";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
    currentState: string;
    myDate;

    constructor(private stateService: StateService) {
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

    colorGreen() {
        document.body.style.backgroundColor = "green";
    }

    colorSalmon() {
        document.body.style.backgroundColor = "#FA8072";
    }

    colorBlack() {
        document.body.style.backgroundColor = "black";
    }

    colorDefault() {
        document.body.style.backgroundColor = "white";
    }
}
