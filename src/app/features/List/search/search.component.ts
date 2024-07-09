import { Component, inject } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsListService } from '../services/products-list.service';
import { Product } from '@/app/shared/product';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterComponent, ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private productListService = inject(ProductsListService);
  products: Product[] = [];

  ngOnInit(): void {
    this.productListService.getProducts({ skip: 0 }).subscribe({
      next: (data) => {
        this.products = data.products;
      },
      error: (err) => console.log(err),
    });
  }
}
