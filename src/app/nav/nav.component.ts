import { Component, OnInit } from '@angular/core';
import { StateService } from '../service/state.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    currentState: string;
    myDate = Date.now();
    constructor(private stateService: StateService) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });
    }
    ngOnInit(): void {}


    colorGreen() {
        document.body.style.backgroundColor = 'green';
    }
    colorSalmon() {
        document.body.style.backgroundColor = '#FA8072';
    }
    colorBlack() {
        document.body.style.backgroundColor = 'black';
    }
    colorDefault() {
        document.body.style.backgroundColor = 'rgb(75 85 95 / 75%)';
    }
}
