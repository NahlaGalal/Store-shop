import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [],
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.scss',
})
export class BrandFilterComponent {
  brands = [
    {
      name: 'Samsung',
      productsNum: 12,
    },
    {
      name: 'Sony',
      productsNum: 11,
    },
    {
      name: 'Xiaom',
      productsNum: 11,
    },
    {
      name: 'Apple',
      productsNum: 9,
    },
    {
      name: 'Canon',
      productsNum: 5,
    },
    {
      name: 'HUAWEI',
      productsNum: 4,
    },
    {
      name: 'HP',
      productsNum: 3,
    },
    {
      name: 'Lenovo',
      productsNum: 3,
    },
  ];
}
