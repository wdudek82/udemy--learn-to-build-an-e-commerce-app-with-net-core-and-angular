import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<IPagination>(`${this.baseUrl}/products`, {
        params: {
          pageSize: '50',
        },
      })
      .pipe(pluck('data'));
  }
}
