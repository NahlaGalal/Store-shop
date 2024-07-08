import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {

}
