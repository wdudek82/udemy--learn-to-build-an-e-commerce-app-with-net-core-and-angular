import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';

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

  removeItem(id: number) {
    console.log('remove item id:', id);
  }

  decrement() {

  }

  increment() {

  }
}
