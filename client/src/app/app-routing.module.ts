import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ProductResolverService } from './shop/product-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop',
    children: [
      { path: '', component: ShopComponent },
      {
        path: ':id',
        component: ProductDetailsComponent,
        resolve: { product: ProductResolverService },
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
