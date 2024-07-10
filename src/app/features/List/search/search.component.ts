import { Component, inject } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsListService } from '../services/products-list.service';
import { ProductListItem } from '@/app/shared/product-list-item';
import { LoadingService } from '@/app/core/loading.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { SelectedFilter } from '@/app/shared/selected-filter';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';

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
        error: (err) => {
          console.log(err);
          this.loadingService.loadingOff();
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
        // Capitalize first letter of product category
        const category = product.category
          .charAt(0)
          .toUpperCase()
          .concat(product.category.slice(1));

        isTrue = isTrue && selectedFilters.categories.includes(category);
      }

      return isTrue;
    });
  }
}
