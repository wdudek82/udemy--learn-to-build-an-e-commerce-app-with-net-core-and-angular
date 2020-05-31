import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasket, IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Input() basket: IBasket;
  @Input() isCheckout = false;

  @Output() decrement = new EventEmitter<IBasketItem>();
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() removeBasketItem = new EventEmitter<IBasketItem>();

  constructor() {}

  ngOnInit(): void {}

  onDecrement(item: IBasketItem) {
    this.decrement.emit(item);
  }

  onIncrement(item: IBasketItem) {
    this.increment.emit(item);
  }

  onRemoveBasketItem(item: IBasketItem) {
    this.removeBasketItem.emit(item);
  }
}
