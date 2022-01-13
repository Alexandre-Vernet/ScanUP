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
        private cartService : CartService
    ) {
        this.productList = this.cartService.receiptCart;
        this.paimentMethods = this.cartService.receiptPaiementHistory;
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
