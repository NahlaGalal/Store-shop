import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapCart,
  bootstrapBookmark,
  bootstrapSearch,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  viewProviders: [
    provideIcons({ bootstrapCart, bootstrapBookmark, bootstrapSearch }),
  ],
})
export class NavbarComponent {}
