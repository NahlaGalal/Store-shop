import { Routes } from '@angular/router';
import { HomeComponent } from './features/List/home/home.component';
import { SearchComponent } from './features/List/search/search.component';
import { CategoryProductsComponent } from './features/List/category-products/category-products.component';
import { ProductComponent } from './features/Details/product/product.component';
import { NotFoundComponent } from './features/Errors/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "Home - Convertedin Store shop",
  },
  {
    path: 'search/:handle',
    component: SearchComponent,
    title: "Search - Convertedin Store shop",
  },
  {
    path: 'categories/:handle',
    component: CategoryProductsComponent,
    title: "Categories - Convertedin Store shop",
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    title: "Product - Convertedin Store shop",
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: "Not found - Convertedin Store shop",
  },
];
