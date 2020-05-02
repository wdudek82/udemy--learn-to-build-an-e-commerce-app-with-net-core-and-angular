import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IPagination } from '../shared/models/pagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  count: number;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getProducts(5).subscribe(
      (res: IPagination) => {
        console.log('=== pagination:', res);
        this.count = res.count;
        this.products = res.data;
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
