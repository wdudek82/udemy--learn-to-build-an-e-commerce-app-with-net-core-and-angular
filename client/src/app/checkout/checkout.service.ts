import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.http
      .get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods')
      .pipe(map((dm) => dm.sort((a, b) => b.price - a.price)));
  }
}
