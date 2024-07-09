import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { BrandFilterComponent } from '../brand-filter/brand-filter.component';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { RateFilterComponent } from '../rate-filter/rate-filter.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CategoryFilterComponent,
    BrandFilterComponent,
    PriceFilterComponent,
    RateFilterComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {}
