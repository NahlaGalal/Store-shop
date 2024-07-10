import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilterComponent } from '../components/filter/filter.component';
import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { ProductsListService } from '../services/products-list.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { LoadingService } from '@/app/core/loading.service';
import { ProductListItem } from '@/app/shared/product-list-item';
import { SelectedFilter } from '@/app/shared/selected-filter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FilterComponent,
    ProductCardComponent,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private productListService = inject(ProductsListService);
  private loadingService = inject(LoadingService);
  products: ProductListItem[] = [];
  filteredProducts: ProductListItem[] = [];
  total: number = 0;

  getData(page: number): void {
    const skip = page ? (page - 1) * 20 : 0;

    this.loadingService.loadingOn();

    this.productListService.getProducts({ skip }).subscribe({
      next: (data) => {
        this.products = data.products;
        this.filteredProducts = data.products;
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
    this.getData(1);
  }

  onChangePageHandler(page: number): void {
    this.getData(page);
  }

  onApplyFilters(selectedFilters: SelectedFilter): void {
    // I applied filters manually to the current page
    // Because there is no api for filtering products

    this.filteredProducts = this.products.filter((product) => {
      // Check for price range and rating range
      let isTrue =
        selectedFilters.price.min <= product.price &&
        selectedFilters.price.max >= product.price &&
        selectedFilters.rate.value <= product.rating &&
        selectedFilters.rate.highValue >= product.rating;

      // Check for brands only if one brand or more are selected
      if (selectedFilters.brands.length) {
        // Restore general text to undefined
        const selectedBrands = selectedFilters.brands.map((brand) =>
          brand === 'General' ? undefined : brand
        );

        isTrue = isTrue && selectedBrands.includes(product.brand);
      }

      // Check for categories only if one category or more are selected
      if (selectedFilters.categories.length) {
        isTrue =
          isTrue && selectedFilters.categories.includes(product.category);
      }

      return isTrue;
    });
  }
}
