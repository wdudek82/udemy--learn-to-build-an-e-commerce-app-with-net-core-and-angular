import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string): Observable<IBasket> {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket) => {
        this.basketSource.next(basket);
        return basket;
      }),
    );
  }

  setBasket(basket: IBasket): void {
    this.http
      .post<IBasket>(this.baseUrl + 'basket', { basket })
      .subscribe(
        (updBasket) => {
          this.basketSource.next(updBasket);
          console.log(updBasket);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  deleteBasket(id: string): void {
    this.http.delete<void>(this.baseUrl + 'basket?id=' + id).subscribe(() => {
      this.basketSource.next(null);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  }

  private createBasket() {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number,
  ) {
    const index = items.findIndex((i) => i.id === itemToAdd.id);

    if (index) {
      items[index].quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items = [...items, itemToAdd];
    }

    return items;
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number,
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
