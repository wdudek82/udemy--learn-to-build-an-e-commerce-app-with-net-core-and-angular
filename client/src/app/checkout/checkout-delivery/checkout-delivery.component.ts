import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from '../../shared/models/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.getDeliveryMethods();
  }

  getDeliveryMethods() {
    this.checkoutService.getDeliveryMethods().subscribe(
      (deliveryMethods) => {
        console.log('=== dms:', deliveryMethods);
        this.deliveryMethods = deliveryMethods;
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
