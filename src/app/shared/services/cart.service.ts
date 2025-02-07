import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Cart } from '../interfaces/cart';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private boolSubject: Subject<boolean> = new Subject<boolean>();
  isCartDropDownVisible$: Observable<boolean> = this.boolSubject.asObservable();
  cartItems: Cart = (JSON.parse(
    localStorage.getItem('cartItems') || '{"items": []}'
  ) as Cart) || {
    items: [],
  };

  toggleCartDropDown(val: boolean): void {
    this.boolSubject.next(val);
  }

  addItemToCart(item: Product, quantity: number): void {
    const isInCart = this.cartItems.items.findIndex(
      (cartItem) => cartItem.product.id === item.id
    );

    if (isInCart !== -1) {
      // This item is in cart => Update quantity and total price
      this.cartItems.items[isInCart] = {
        ...this.cartItems.items[isInCart],
        quantity,
        totalPrice: item.price * quantity,
      };
    } else {
      // This item is not in cart => Add item to cart
      this.cartItems.items.push({
        product: item,
        quantity,
        totalPrice: item.price * quantity,
      });
    }

    // Set cart items in localestorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    this.toggleCartDropDown(true);

    setTimeout(() => {
      this.toggleCartDropDown(false);
    }, 3000);
  }
}
