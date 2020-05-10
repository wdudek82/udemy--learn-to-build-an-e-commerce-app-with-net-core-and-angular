import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string): Observable<void> {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }),
    );
  }

  setBasket(basket: IBasket): void {
    this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (updBasket) => {
        this.basketSource.next(updBasket);
        this.calculateTotals();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  deleteBasket(basket: IBasket) {
    return this.http
      .delete<void>(this.baseUrl + 'basket?id=' + basket.id)
      .subscribe(
        () => {
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id');
        },
        (error) => console.log(error),
      );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((i) => i.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((i) => i.id === item.id);

    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
    } else {
      this.removeItemFromBasket(item);
    }

    this.setBasket(basket);
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

    if (index > -1) {
      items[index].quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items = [...items, itemToAdd];
    }

    return items;
  }

  removeItemFromBasket(item: IBasketItem): void {
    const basket = this.basketSource.value;
    basket.items = basket.items.filter((i) => i.id !== item.id);

    if (!basket.items.length) {
      this.deleteBasket(basket);
    } else {
      this.setBasket(basket);
    }
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
      productBrand: item.productBrand,
      productType: item.productType,
    };
  }

  private calculateTotals(): void {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce(
      (acc, i) => i.price * i.quantity + acc,
      0,
    );
    const total = subtotal + shipping;

    this.basketTotalSource.next({ shipping, total, subtotal });
  }

}
