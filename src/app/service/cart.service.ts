import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private waintingCart: Cart = new Cart;

  private cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart);
  cartChanged$: Observable<Cart> = this.cart$.asObservable();
  private cart: Cart = new Cart;
  
  constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.addProduct(product);
    this.notifyCart();
  }

  deleteProduct(id) {
    this.cart.deleteProductById(id);
    this.notifyCart();
  }

  changeQuantity(id, qte) {
    this.cart.products[id].quantity = qte;
    this.notifyCart();
  }

  putCartInWait() {
    this.cart.products.forEach(product => {
      this.waintingCart.addProduct(product);
    });
    this.emptyCart();
    this.notifyCart();
  }

  stopCartInWait() {
    this.waintingCart.products.forEach(product => {
      this.cart.addProduct(product);
    });
    this.waintingCart.emptyCart();
    this.notifyCart();
  }

  emptyCart() {
    this.cart.emptyCart();
    this.notifyCart();
  }

  isEmpty() {
    return !this.cart.products.length;
  }

  notifyCart(){
    this.cart$.next(this.cart);
  }

}
