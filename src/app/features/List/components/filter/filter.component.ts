import { Component, Input, output } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { BrandFilterComponent } from '../brand-filter/brand-filter.component';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { RateFilterComponent } from '../rate-filter/rate-filter.component';
import { ProductListItem } from '@/app/shared/product-list-item';
import { SelectedFilter } from '@/app/shared/selected-filter';

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
  onApplyFilters = output<SelectedFilter>();
  brands: { name: string; productsNum: number }[] = [];
  categories: string[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 0 };
  selectedFilters: SelectedFilter = {
    brands: [],
    categories: [],
    rate: { value: 0, highValue: 5 },
    price: this.priceRange,
  };

  ngOnChanges(): void {
    // Reset brands array
    this.brands = [];
    // Reset categories array
    this.categories = [];

    const categoriesSet = new Set<string>();

    this.products.forEach((product) => {
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
    this.priceRange = {
      min: Math.floor(
        Math.min(...this.products.map((product) => product.price))
      ),
      max: Math.ceil(
        Math.max(...this.products.map((product) => product.price))
      ),
    };
    this.selectedFilters.price = this.priceRange;
  }

  onToggleBrand({
    brand,
    isChecked,
  }: {
    brand: string;
    isChecked: boolean;
  }): void {
    // When check one brand => Add it to the selected list
    if (isChecked) {
      this.selectedFilters.brands.push(brand);
    } else {
      // When uncheck one brand => Remove it from the selected list
      const brandIndex = this.selectedFilters.brands.indexOf(brand);

      this.selectedFilters.brands.splice(brandIndex, 1);
    }

    // Apply filters
    this.onApplyFilters.emit(this.selectedFilters);
  }

  onToggleCategory({
    category,
    isChecked,
  }: {
    category: string;
    isChecked: boolean;
  }): void {
    if (isChecked) {
      // When check one category, add it to the selected filters
      this.selectedFilters.categories.push(category);
    } else {
      // When uncheck one category, remove it from the selected filters
      const categoryIndex = this.selectedFilters.categories.indexOf(category);

      this.selectedFilters.categories.splice(categoryIndex, 1);
    }

    // Apply filters
    this.onApplyFilters.emit(this.selectedFilters);
  }

  onChangeRate({
    value,
    highValue,
  }: {
    value: number;
    highValue: number;
  }): void {
    // Add current rate to selected filters
    this.selectedFilters.rate = {
      value,
      highValue,
    };

    // Apply filters
    this.onApplyFilters.emit(this.selectedFilters);
  }

  onChangePrice({ min, max }: { min: number; max: number }): void {
    // Add current price to selected filters
    this.selectedFilters.price = { min, max };

    // Apply filters
    this.onApplyFilters.emit(this.selectedFilters);
  }
}
