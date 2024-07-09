import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilterComponent } from '../components/filter/filter.component';
import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { ProductsListService } from '../services/products-list.service';
import { Product } from '@/app/shared/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BreadcrumbComponent, FilterComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
