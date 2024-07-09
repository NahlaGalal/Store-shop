import { Cart } from '@/app/shared/cart';
import { CartService } from '@/app/shared/cart.service';
import { Component, inject } from '@angular/core';
import { bootstrapTrash2 } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-cart-drop-down',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './cart-drop-down.component.html',
  styleUrl: './cart-drop-down.component.scss',
  viewProviders: [provideIcons({ bootstrapTrash2 })],
})
export class CartDropDownComponent {
  private cartService = inject(CartService);
  cartItems: Cart = { items: [] };

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
  }
}
