import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilterComponent } from '../components/filter/filter.component';
import { ProductsListService } from '../services/products-list.service';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { LoadingService } from '@/app/core/loading.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductListItem } from '../interfaces/product-list-item';
import { Store } from '@ngrx/store';
import { IState } from '@/app/store/reducers/filterProducts.reducer';
import {
  resetFilters,
  setProducts,
} from '@/app/store/actions/filterProducts.actions';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FilterComponent,
    ProductCardComponent,
    PaginationComponent,
  ],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent {
  private productListService = inject(ProductsListService);
  private loadingService = inject(LoadingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  filteredProducts: ProductListItem[] = [];
  total: number = 0;
  category: string = '';
  isFiltersVisible: boolean = false;

  constructor(private store: Store<{ list: IState }>) {
    store.select('list').subscribe({
      next: (val) => {
        this.filteredProducts = val.filteredProducts;
      },
    });
  }

  getData(page?: number): void {
    this.store.dispatch(resetFilters());

    const skip = page ? (page - 1) * 20 : 0;

    this.loadingService.loadingOn();

    this.productListService
      .getProducts({ skip, category: this.category })
      .subscribe({
        next: (data) => {
          if (!data.total) {
            this.router.navigate(['/error'], { replaceUrl: true });
          }

          this.store.dispatch(setProducts({ products: data.products }));
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
      next: ({ slug }: Params) => {
        this.category = slug;
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
