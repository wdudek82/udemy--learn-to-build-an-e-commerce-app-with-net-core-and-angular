import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  breadcrumb$: Observable<any[]>;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumb$ = this.breadcrumbService.breadcrumbs$;
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
