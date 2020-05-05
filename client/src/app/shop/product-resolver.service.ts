import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IProduct } from '../shared/models/product';
import { Observable } from 'rxjs';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<IProduct> {
  constructor(private shopService: ShopService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<IProduct> | Promise<IProduct> | IProduct {
    const productId = route.params.id;
    return this.shopService.getProduct(productId);
  }
}
