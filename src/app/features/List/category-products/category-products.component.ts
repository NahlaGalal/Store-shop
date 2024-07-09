import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductsListService } from '../services/products-list.service';
import { Product } from '@/app/shared/product';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [BreadcrumbComponent, FilterComponent, ProductCardComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent {
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
