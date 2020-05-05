import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;
  private $routeSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.$routeSub = this.route.params.subscribe((params) => {
      console.log('=== params:', params);
    });
  }

  ngOnDestroy(): void {
    this.$routeSub.unsubscribe();
  }

  goToProductDetails(id: number) {
    this.router.navigateByUrl('/shop/' + id);
  }
}
