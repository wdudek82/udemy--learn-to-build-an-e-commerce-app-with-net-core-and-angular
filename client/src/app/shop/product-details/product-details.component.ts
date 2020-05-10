import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { IProduct } from '../../shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { IBasket, IBasketItem } from '../../shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  product: IProduct;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadProduct() {
    this.route.data.subscribe((data) => {
      this.product = data.product;
      this.breadcrumbService.set('@productDetails', this.product.name);
    });
  }

  addProductToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }
}
