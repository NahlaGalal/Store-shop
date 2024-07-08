import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories-bar.component.html',
  styleUrl: './categories-bar.component.scss',
})
export class CategoriesBarComponent {
  categories = [
    {
      slug: 'beauty',
      name: 'Beauty',
      url: 'https://dummyjson.com/products/category/beauty',
    },
    {
      slug: 'fragrances',
      name: 'Fragrances',
      url: 'https://dummyjson.com/products/category/fragrances',
    },
    {
      slug: 'furniture',
      name: 'Furniture',
      url: 'https://dummyjson.com/products/category/furniture',
    },
  ];
}
