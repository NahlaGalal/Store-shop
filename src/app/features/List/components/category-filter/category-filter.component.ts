import { Component, inject, Input, output } from '@angular/core';
import { Category } from '@/app/shared/category';
import { CategoriesService } from '@/app/shared/categories.service';

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
      error: (err) => console.log(err),
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
