import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  product: IProduct;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.product = data.product;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
