import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '@/app/shared/services/categories.service';
import { Category } from '@/app/shared/interfaces/category';
import { CacheService } from '@/app/shared/services/cache.service';

@Component({
  selector: 'app-categories-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories-bar.component.html',
  styleUrl: './categories-bar.component.scss',
})
export class CategoriesBarComponent {
  categories: Category[] = [];
  cacheKey = `categories`;
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  constructor(private cacheService: CacheService) {}

  ngOnInit(): void {
    const cachedData: Category[] | null = this.cacheService.get(this.cacheKey);

    // Get data from the api if no cache
    if (!cachedData) {
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.cacheService.set(this.cacheKey, data);
          this.categories = data.slice(0, 10);
        },
        error: () =>
          this.router.navigate(['/error-default'], { replaceUrl: true }),
      });
    } else {
      this.categories = cachedData.slice(0, 10);
    }
  }
}
