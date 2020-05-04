import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss'],
})
export class PagingHeaderComponent implements OnInit {
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() pageNumber: number;

  constructor() {}

  ngOnInit(): void {}
}
