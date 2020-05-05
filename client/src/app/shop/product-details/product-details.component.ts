import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  productId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe((params) => {
      console.log('=== params:', params);
      this.productId = params.id;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
