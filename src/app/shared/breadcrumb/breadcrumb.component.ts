import { Component, Input } from '@angular/core';
import { bootstrapHouse } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  viewProviders: [provideIcons({ bootstrapHouse })],
})
export class BreadcrumbComponent {
  @Input() items: string[] = [];
}
