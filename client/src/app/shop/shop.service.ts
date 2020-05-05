import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductBrand } from '../shared/models/product-brand';
import { IProductType } from '../shared/models/product-type';
import { tap } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shop-params';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    const {
      brandId,
      typeId,
      sort,
      searchBy,
      pageNumber,
      pageSize,
    } = shopParams;
    let params = new HttpParams();

    if (brandId) {
      params = params.set('brandId', brandId.toString());
    }
    if (typeId) {
      params = params.set('typeId', typeId.toString());
    }
    if (searchBy) {
      params = params.set('search', searchBy);
    }

    params = params.set('sort', sort);
    params = params.set('pageIndex', pageNumber.toString());
    params = params.set('pageSize', pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + '/products', {
        params,
      })
      .pipe(tap((data) => console.log(data)));
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl + '/products/' + id);
  }

  getProductBrands() {
    return this.http.get<IProductBrand[]>(this.baseUrl + '/products/brands');
  }

  getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + '/products/types');
  }
}
