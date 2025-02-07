import { Component, inject } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsListService } from '../services/products-list.service';
import { LoadingService } from '@/app/core/loading.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { ProductListItem } from '../interfaces/product-list-item';
import {
  resetFilters,
  setProducts,
} from '@/app/store/actions/filterProducts.actions';
import { Store } from '@ngrx/store';
import { IState } from '@/app/store/reducers/filterProducts.reducer';
import { CacheService } from '@/app/shared/services/cache.service';

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
  filteredProducts: ProductListItem[] = [];
  total: number = 0;
  searchHandle: string = '';
  isFiltersVisible: boolean = false;

  constructor(
    private store: Store<{ list: IState }>,
    private cacheService: CacheService
  ) {
    store.select('list').subscribe({
      next: (val) => {
        this.filteredProducts = val.filteredProducts;
      },
    });
  }

  getData(page?: number): void {
    this.store.dispatch(resetFilters());

    const skip = page ? (page - 1) * 20 : 0;
    const cachedData: {
      products: ProductListItem[];
      limit: number;
      skip: number;
      total: number;
    } | null = this.cacheService.get(`search-${this.searchHandle}-${page}`);

    // Get data from the api if no cache
    if (!cachedData) {
      this.loadingService.loadingOn();

      this.productListService
        .getProducts({ skip, search: this.searchHandle })
        .subscribe({
          next: (data) => {
            this.cacheService.set(`search-${this.searchHandle}-${page}`, data);
            this.store.dispatch(setProducts({ products: data.products }));
            this.total = data.total;
          },
          error: () => {
            this.loadingService.loadingOff();
            this.router.navigate(['/error-default'], { replaceUrl: true });
          },
          complete: () => this.loadingService.loadingOff(),
        });
    } else {
      this.store.dispatch(setProducts({ products: cachedData.products }));
      this.total = cachedData.total;
    }
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

  toggleFiltersOverlay(val: boolean) {
    this.isFiltersVisible = val;
  }
}
