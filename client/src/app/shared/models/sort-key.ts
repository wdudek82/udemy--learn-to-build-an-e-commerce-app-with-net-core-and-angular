export type ISortKey = 'priceAsc' | 'priceDesc' | 'nameDesc' | '';

export interface ISortOption {
  value: ISortKey;
  name: string;
}
