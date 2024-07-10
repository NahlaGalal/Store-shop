import { BreadcrumbComponent } from '@/app/shared/breadcrumb/breadcrumb.component';
import { Component, inject } from '@angular/core';
import { ProductInfoComponent } from '@/app/features/Details/components/product-info/product-info.component';
import { ProductService } from '@/app/features/Details/services/product.service';
import { Product } from '@/app/shared/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@/app/core/loading.service';
import { CacheService } from '@/app/shared/services/cache.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [BreadcrumbComponent, ProductInfoComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product: Product | undefined;
  breadCrumbItems: string[] = [];
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loading = inject(LoadingService);
  id = Number(this.route.snapshot.paramMap.get('id'));
  cacheKey = `product-${this.id}`;

  constructor(private cacheService: CacheService) {}

  ngOnInit(): void {
    const cachedData: Product | null = this.cacheService.get(this.cacheKey);

    // Get data from the api if no cache
    if (!cachedData) {
      this.loading.loadingOn();

      this.productService.getProductDetails(this.id).subscribe({
        next: (data) => {
          this.cacheService.set(this.cacheKey, data);
          this.product = data;
          this.breadCrumbItems = [this.product.category, this.product.title];
        },
        error: (err) => {
          this.loading.loadingOff();

          if (err.status === 404) {
            this.router.navigate(['/error'], { replaceUrl: true });
          }
        },
        complete: () => this.loading.loadingOff(),
      });
    } else {
      this.product = cachedData as Product;
      this.breadCrumbItems = [this.product.category, this.product.title];
    }
  }
}
