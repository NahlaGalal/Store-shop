import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/app/core/navbar/navbar.component';
import { CategoriesBarComponent } from '@/app/core/categories-bar/categories-bar.component';
import { LoadingComponent } from '@/app/core/loading/loading.component';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CategoriesBarComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private cartService = inject(CartService);

  ngAfterViewInit() {
    document.addEventListener('click', () => {
      this.cartService.toggleCartDropDown(false);
    });
  }
}
