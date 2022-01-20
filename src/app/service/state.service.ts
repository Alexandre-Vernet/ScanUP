import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../state.enum';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    constructor() {}

    currentState = State.WaitForScan;
    idEdit: number;

    private currentState$: BehaviorSubject<string> =
        new BehaviorSubject<string>('');
    currentStateChanged$: Observable<string> =
        this.currentState$.asObservable();

    checkState(etatInit, etatTarget, condition: boolean, callback) {
        if (this.currentState == etatInit && condition) {
            this.currentState = etatTarget;
            console.log(etatInit + ' => ' + etatTarget);
            callback;
        }
        this.notifyState();
    }
    notifyState() {
        this.currentState$.next(this.currentState);
    }
    setIdEdit(id) {
        this.idEdit = id;
    }
}
