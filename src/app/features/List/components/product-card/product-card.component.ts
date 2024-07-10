import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootstrapStarFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProductListItem } from '../../interfaces/product-list-item';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  viewProviders: [provideIcons({ bootstrapStarFill })],
})
export class ProductCardComponent {
  @Input() product!: ProductListItem;
}
