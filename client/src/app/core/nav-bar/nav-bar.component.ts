import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { IBasket, IBasketItem } from '../../shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;
  }

  ngOnInit(): void {}
}
