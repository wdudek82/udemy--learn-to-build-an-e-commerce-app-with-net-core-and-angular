import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts(
    pageSize: number = 50,
    pageIndex: number = 1,
  ): Observable<IPagination> {
    return this.http.get<IPagination>(`${this.baseUrl}/products`, {
      params: {
        pageSize: '' + pageSize,
        pageIndex: '' + pageIndex,
      },
    });
  }
}
