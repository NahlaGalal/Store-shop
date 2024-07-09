import { CartService } from '@/app/shared/cart.service';
import { Product } from '@/app/shared/product';
import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { bootstrapStarFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  viewProviders: [provideIcons({ bootstrapStarFill })],
})
export class ProductInfoComponent {
  @Input() product: Product | undefined;
  private cartService = inject(CartService);
  thumbnailUrl: string = '';
  qunatityOptions: number[] = [];
  quantityInput = new FormControl(1);

  ngOnInit() {
    if (this.product) {
      this.setThumbnail(this.product.thumbnail);
      this.qunatityOptions = new Array(Math.min(this.product.stock, 10))
        .fill(0)
        .map((_, i) => i + 1);
    }
  }

  ngOnChanges() {
    if (this.product) {
      this.setThumbnail(this.product.thumbnail);
      this.qunatityOptions = new Array(Math.min(this.product.stock, 10))
        .fill(0)
        .map((_, i) => i + 1);
    }
  }

  setThumbnail(url: string): void {
    this.thumbnailUrl = url;
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addItemToCart(this.product!, this.quantityInput.value!);
  }
}
