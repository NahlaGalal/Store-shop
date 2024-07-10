import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { BrandFilterComponent } from '../brand-filter/brand-filter.component';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { RateFilterComponent } from '../rate-filter/rate-filter.component';
import { ProductListItem } from '../../interfaces/product-list-item';
import { Store } from '@ngrx/store';
import { changePriceRange } from '@/app/store/actions/filterProducts.actions';
import { IState } from '@/app/store/reducers/filterProducts.reducer';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CategoryFilterComponent,
    BrandFilterComponent,
    PriceFilterComponent,
    RateFilterComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  brands: { name: string; productsNum: number }[] = [];
  categories: string[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 0 };

  constructor(private store: Store<{ list: IState }>) {
    store
      .select((val) => val.list.products)
      .subscribe({
        next: (products) => {
          this.setFilterKeys(products);
        },
      });
  }

  setFilterKeys(products: ProductListItem[]): void {
    // Reset brands array
    this.brands = [];
    // Reset categories array
    this.categories = [];

    const categoriesSet = new Set<string>();

    products.forEach((product) => {
      // Extract brands from the products list
      const isBrandExist = this.brands.findIndex(
        (brand) => brand.name === (product.brand || 'General')
      );

      if (isBrandExist === -1) {
        // Add the brand if it doesn't already exist
        this.brands.push({ name: product.brand || 'General', productsNum: 1 });
      } else {
        // Increase products number if brand already exists
        this.brands[isBrandExist] = {
          name: product.brand || 'General',
          productsNum: this.brands[isBrandExist].productsNum + 1,
        };
      }

      // Extract categories from the products list
      categoriesSet.add(product.category);
    });

    this.categories = Array.from(categoriesSet);

    // Extract price range from the products
    if (products.length) {
      this.priceRange = {
        min: Math.floor(Math.min(...products.map((product) => product.price))),
        max: Math.ceil(Math.max(...products.map((product) => product.price))),
      };
    } else {
      this.priceRange = { min: 0, max: 0 };
    }

    this.store.dispatch(changePriceRange(this.priceRange));
  }
}
