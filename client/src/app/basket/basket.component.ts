import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {
    this.basket$ = basketService.basket$;
  }

  ngOnInit(): void {}

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  decrement(item: IBasketItem) {
    if (item.quantity > 1) {
      this.basketService.decrementItemQuantity(item);
    } else {
      this.removeBasketItem(item);
    }
  }

  increment(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }
}
