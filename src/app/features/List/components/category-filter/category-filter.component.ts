import { Component, inject, Input, output } from '@angular/core';
import { Category } from '@/app/shared/interfaces/category';
import { CategoriesService } from '@/app/shared/services/categories.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toggleCategroies } from '@/app/store/actions/filterProducts.actions';
import { CacheService } from '@/app/shared/services/cache.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];

  private categoriesService = inject(CategoriesService);
  private router = inject(Router);
  filteredCategories: Category[] = [];
  allCategories: Category[] = [];
  cacheKey = `categories`;

  constructor(private store: Store, private cacheService: CacheService) {}

  ngOnInit(): void {
    const cachedData: Category[] | null = this.cacheService.get(this.cacheKey);

    if (!cachedData) {
      this.categoriesService.getCategories().subscribe({
        next: (data) => {
          this.cacheService.set(this.cacheKey, data);
          this.allCategories = data;
          this.filteredCategories = data.filter((category) =>
            this.categories.includes(category.slug)
          );
        },
        error: () =>
          this.router.navigate(['error-default'], { replaceUrl: true }),
      });
    } else {
      this.allCategories = cachedData;
      this.filteredCategories = cachedData.filter((category) =>
        this.categories.includes(category.slug)
      );
    }
  }

  ngOnChanges(): void {
    this.filteredCategories = this.allCategories.filter((category) =>
      this.categories.includes(category.slug)
    );
  }

  onToggleCategory(event: Event, name: string): void {
    this.store.dispatch(
      toggleCategroies({
        category: name,
        isChecked: (event.currentTarget as HTMLInputElement).checked,
      })
    );
  }
}
