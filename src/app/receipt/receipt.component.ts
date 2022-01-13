import {
    Component,
} from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
    selector: 'app-receipt',
    templateUrl: './receipt.component.html',
    styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent {
    productList = [];
    paimentMethods: string[] = [];

    marketInfos = {
        name: 'BricoMarket',
        address: '34 chemin de l\'allée',
        city: '31 111 TOulouse',
        phone: '06 11 11 11 11',
        web: 'www.bricomarket.com'
    }

    constructor(
    ) {

        if(!localStorage.getItem('receiptData')){
            return;
        }

        const { productList, paimentMethods } = JSON.parse(localStorage.getItem('receiptData'));

        if (!productList && !paimentMethods) {
            return;
        }

        this.productList = productList;
        this.paimentMethods = paimentMethods;

        localStorage.removeItem('receiptData');
    }

    getTotal(): number {
        let total = 0;
        this.productList.forEach(
            (product) => {
                total += product.price * product.quantity;
            }
        );
        return total;
    }

    getTVA() {
        return this.getTotal() * 0.2;
    }

}
