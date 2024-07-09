import { Product } from '@/app/shared/product';
import { Component, Input } from '@angular/core';
import { bootstrapStarFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  viewProviders: [provideIcons({ bootstrapStarFill })],
})
export class ProductInfoComponent {
  @Input() product: Product | undefined;
  thumbnailUrl: string = '';

  ngOnInit() {
    if (this.product) {
      this.setThumbnail(this.product.thumbnail);
    }
  }
  
  ngOnChanges() {
    if (this.product) {
      this.setThumbnail(this.product.thumbnail);
    }
  }

  setThumbnail(url: string): void {
    this.thumbnailUrl = url;
  }
}
