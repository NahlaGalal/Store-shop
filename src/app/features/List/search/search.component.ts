import { Component, inject } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsListService } from '../services/products-list.service';
import { LoadingService } from '@/app/core/loading.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { ProductListItem } from '../interfaces/product-list-item';
import { SelectedFilter } from '../interfaces/selected-filter';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FilterComponent,
    ProductCardComponent,
    PaginationComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private productListService = inject(ProductsListService);
  private loadingService = inject(LoadingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  products: ProductListItem[] = [];
  filteredProducts: ProductListItem[] = [];
  total: number = 0;
  searchHandle: string = '';

  getData(page?: number): void {
    const skip = page ? (page - 1) * 20 : 0;

    this.loadingService.loadingOn();

    this.productListService
      .getProducts({ skip, search: this.searchHandle })
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.filteredProducts = data.products;
          this.total = data.total;
        },
        error: () => {
          this.loadingService.loadingOff();
          this.router.navigate(['/error-default'], { replaceUrl: true });
        },
        complete: () => this.loadingService.loadingOff(),
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: ({ handle }: Params) => {
        this.searchHandle = handle;
        this.getData();
      },
    });
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
