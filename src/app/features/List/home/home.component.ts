import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilterComponent } from '../components/filter/filter.component';
import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { ProductsListService } from '../services/products-list.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { LoadingService } from '@/app/core/loading.service';
import { ProductListItem } from '../interfaces/product-list-item';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IState } from '@/app/store/reducers/filterProducts.reducer';
import { resetFilters, setProducts } from '@/app/store/actions/filterProducts.actions';
import { CacheService } from '@/app/shared/services/cache.service';

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
  private router = inject(Router);
  filteredProducts: ProductListItem[] = [];
  total: number = 0;
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

  getData(page: number): void {
    this.store.dispatch(resetFilters());

    const skip = page ? (page - 1) * 20 : 0;
    const cachedData: {
      products: ProductListItem[];
      limit: number;
      skip: number;
      total: number;
    } | null = this.cacheService.get(`home-${page}`);

    // Get data from the api if no cache
    if (!cachedData) {
      this.loadingService.loadingOn();

      this.productListService.getProducts({ skip }).subscribe({
        next: (data) => {
          this.cacheService.set(`home-${page}`, data);
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
    this.getData(1);
  }

  onChangePageHandler(page: number): void {
    this.getData(page);
  }

  toggleFiltersOverlay(val: boolean) {
    this.isFiltersVisible = val;
  }
}
