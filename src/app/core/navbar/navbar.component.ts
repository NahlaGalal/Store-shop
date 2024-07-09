import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapCart,
  bootstrapBookmark,
  bootstrapSearch,
} from '@ng-icons/bootstrap-icons';
import { CartDropDownComponent } from '../cart-drop-down/cart-drop-down.component';
import { CartService } from '@/app/shared/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, CartDropDownComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  viewProviders: [
    provideIcons({ bootstrapCart, bootstrapBookmark, bootstrapSearch }),
  ],
})
export class NavbarComponent {
  private cartService = inject(CartService);
  isCartDropDownVisible: boolean = false;

  ngOnInit(): void {
    this.cartService.isCartDropDownVisible$.subscribe({
      next: (val) => {
        this.isCartDropDownVisible = val;
      },
    });
  }

  toggleCartDropDown(event: Event): void {
    event.stopPropagation();
    this.cartService.toggleCartDropDown(!this.isCartDropDownVisible);
  }
}
