import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { Component, inject } from '@angular/core';
import { ProductInfoComponent } from '@/app/features/Details/components/product-info/product-info.component';
import { ProductService } from '@/app/features/Details/services/product.service';
import { Product } from '@/app/shared/product';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@/app/core/loading.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [BreadcrumbComponent, ProductInfoComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product: Product | undefined;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loading = inject(LoadingService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loading.loadingOn();

    this.productService.getProductDetails(id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => {
        this.loading.loadingOff();

        if (err.status === 404) {
          this.router.navigate(['/error'], { replaceUrl: true });
        }
      },
      complete: () => this.loading.loadingOff(),
    });
  }
}
