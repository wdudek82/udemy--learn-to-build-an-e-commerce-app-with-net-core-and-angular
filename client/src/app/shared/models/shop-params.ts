import { ISortKey } from './sort-key';

export class ShopParams {
  brandId = 0;
  typeId = 0;
  sort: ISortKey = '';
  pageNumber = 1;
  pageSize = 6;
  searchBy = '';
}
