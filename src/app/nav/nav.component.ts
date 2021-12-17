import { Component, OnInit } from '@angular/core';
import { StateService } from '../service/state.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    currentState: string;
    constructor(private stateService: StateService) {
        this.stateService.currentStateChanged$.subscribe((data) => {
            this.currentState = data;
        });
    }

    ngOnInit(): void {}
}
