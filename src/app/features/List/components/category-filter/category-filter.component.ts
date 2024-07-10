import { Component, inject, Input, output } from '@angular/core';
import { Category } from '@/app/shared/interfaces/category';
import { CategoriesService } from '@/app/shared/services/categories.service';
import { Router } from '@angular/router';

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
  onToggleCategoryEmit = output<{ category: string; isChecked: boolean }>({
    alias: 'onToggleCategory',
  });

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
        this.filteredCategories = data.filter((category) =>
          this.categories.includes(category.slug)
        );
      },
      error: () =>
        this.router.navigate(['error-default'], { replaceUrl: true }),
    });
  }

  ngOnChanges(): void {
    this.filteredCategories = this.allCategories.filter((category) =>
      this.categories.includes(category.slug)
    );
  }

  onToggleCategory(event: Event, name: string): void {
    this.onToggleCategoryEmit.emit({
      category: name,
      isChecked: (event.currentTarget as HTMLInputElement).checked,
    });
  }
}
