import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FilterComponent } from '../components/filter/filter.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [BreadcrumbComponent, FilterComponent, ProductCardComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {

}
