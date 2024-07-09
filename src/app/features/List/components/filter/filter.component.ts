import { Component, Input } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { BrandFilterComponent } from '../brand-filter/brand-filter.component';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { RateFilterComponent } from '../rate-filter/rate-filter.component';
import { ProductListItem } from '@/app/shared/product-list-item';

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
  @Input() products: ProductListItem[] = [];
  brands: { name: string; productsNum: number }[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 0 };

  ngOnChanges(): void {
    // Reset brands array
    this.brands = [];

    // Extract brands from the products list
    this.products.forEach((product) => {
      const isBrandExist = this.brands.findIndex(
        (brand) => brand.name === (product.brand || "General") 
      );

      if (isBrandExist === -1) {
        // Add the brand if it doesn't already exist
        this.brands.push({ name: (product.brand || "General"), productsNum: 1 });
      } else {
        // Increase products number if brand already exists
        this.brands[isBrandExist] = {
          name: product.brand || "General",
          productsNum: this.brands[isBrandExist].productsNum + 1,
        };
      }
    });

    // Extract price range from the products
    this.priceRange = {
      min: Math.min(...this.products.map(product => product.price)),
      max: Math.max(...this.products.map(product => product.price))
    }
  }
}
