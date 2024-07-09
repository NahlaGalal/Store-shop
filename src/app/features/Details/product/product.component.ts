import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { Component } from '@angular/core';
import { ProductInfoComponent } from '@/app/features/Details/components/product-info/product-info.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [BreadcrumbComponent, ProductInfoComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
