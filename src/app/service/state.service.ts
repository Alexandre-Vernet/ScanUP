import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    constructor() {}

    currentState = 'waitScan';
    idEdit: number;

    private currentState$: BehaviorSubject<string> =
        new BehaviorSubject<string>('');
    currentStateChanged$: Observable<string> =
        this.currentState$.asObservable();

    checkState(etatInit, etatTarget, condition: boolean, callback) {
        if (this.currentState == etatInit && condition) {
            this.currentState = etatTarget;
            callback;
            console.log(etatInit + ' => ' + etatTarget);
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
