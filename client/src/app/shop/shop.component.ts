import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IPagination } from '../shared/models/pagination';
import { IProductBrand } from '../shared/models/product-brand';
import { IProductType } from '../shared/models/product-type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ShopParams } from '../shared/models/shop-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  totalCount: number;

  productBrands: IProductBrand[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  sortOptions = [
    { value: '', name: 'Alphabetical' },
    { value: 'nameDesc', name: 'Alphabetical (reversed)' },
    { value: 'priceAsc', name: 'Price: Low to High' },
    { value: 'priceDesc', name: 'Price: High to Low' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(
        this.shopParams,
      )
      .subscribe(
        (res: IPagination) => {
          this.products = res.data;
          this.shopParams.pageNumber = res.pageIndex;
          this.shopParams.pageSize = res.pageSize;
          this.totalCount = res.count;
        },
        (error) => {
          console.log(error);
        },
      );
  }

  getProductBrands() {
    this.shopService.getProductBrands().subscribe((brands) => {
      this.productBrands = [{ id: 0, name: 'All' }, ...brands];
    });
  }

  getProductTypes() {
    this.shopService.getProductTypes().subscribe((types) => {
      this.productTypes = [{ id: 0, name: 'All' }, ...types];
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(event) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onSearchBy(): void {
    console.log(this.shopParams.searchBy);
    this.getProducts();
  }

  onResetSearchBy(): void {
    this.shopParams.searchBy = '';
    this.getProducts();
  }

  onPageChanged(pagination: PageChangedEvent) {
    this.shopParams.pageNumber = pagination.page;
    this.shopParams.pageSize = pagination.itemsPerPage;
    this.getProducts();
  }
}
