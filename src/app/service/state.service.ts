import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    constructor() {}

    currentState = 'waitScan';
    private currentState$: BehaviorSubject<string> =
        new BehaviorSubject<string>('');
    currentStateChanged$: Observable<string> =
        this.currentState$.asObservable();

    checkState(etatInit, etatTarget, condition: boolean, callback) {
        if (this.currentState == etatInit && condition) {
            this.currentState = etatTarget;
            callback;
        }
        this.notifyState();
    }
    notifyState() {
        this.currentState$.next(this.currentState);
    }
    /*



//MISE EN ATTENTE
checkState('waitScan','miseEnAttente',selectMiseEnAttente, stockProductList);
checkState('miseEnAttente','waitSwan',selectReprise, recupProductList);

//CRUD PRODUCT
checkState('miseEnAttente','edit',dbclickPdt);
checkState('edit','waitScan',enterQte,editPdtQte);
*/
}
