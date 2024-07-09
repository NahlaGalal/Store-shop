import { Component, Input, output } from '@angular/core';
import {
  bootstrapArrowLeftShort,
  bootstrapArrowRightShort,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  viewProviders: [
    provideIcons({ bootstrapArrowLeftShort, bootstrapArrowRightShort }),
  ],
})
export class PaginationComponent {
  @Input() total: number = 0;
  onChangePageHandler = output<number>();
  pages: number[] = [];
  currentPage: number = 1;

  ngOnInit(): void {
    this.pages = new Array(Math.ceil(this.total / 20))
      .fill(0)
      .map((_, i) => i + 1);
  }

  ngOnChanges(): void {
    this.pages = new Array(Math.ceil(this.total / 20))
      .fill(0)
      .map((_, i) => i + 1);
  }

  onChangePage(page: number):void {
    this.currentPage = page;
    this.onChangePageHandler.emit(page);
  }
}
