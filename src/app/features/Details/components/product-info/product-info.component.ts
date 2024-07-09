import { Component } from '@angular/core';
import { bootstrapStarFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  viewProviders: [provideIcons({ bootstrapStarFill })],
})
export class ProductInfoComponent {}
