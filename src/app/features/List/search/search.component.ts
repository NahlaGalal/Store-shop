import { Component, inject } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsListService } from '../services/products-list.service';
import { ProductListItem } from '@/app/shared/product-list-item';
import { LoadingService } from '@/app/core/loading.service';
import { PaginationComponent } from '../components/pagination/pagination.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterComponent, ProductCardComponent, PaginationComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private productListService = inject(ProductsListService);
  private loadingService = inject(LoadingService);
  products: ProductListItem[] = [];
  total: number = 0;

  getData(page?: number): void {
    const skip = page ? (page - 1) * 20 : 0;

    this.loadingService.loadingOn();

    this.productListService.getProducts({ skip }).subscribe({
      next: (data) => {
        this.products = data.products;
        this.total = data.total;
      },
      error: (err) => {
        console.log(err);
        this.loadingService.loadingOff();
      },
      complete: () => this.loadingService.loadingOff(),
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onChangePageHandler(page: number): void {
    this.getData(page);
  }
}
