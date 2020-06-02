import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../shared/models/basket';
import { IOrder, IOrderToCreate } from '../../shared/models/order';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  submitOrder(): void {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);

    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.toastr.success('Order created successfully.');
        this.basketService.deleteLocalBasket();

        console.log('=== order:', order);

        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigateByUrl('/checkout/success', navigationExtras);
      },
      (error) => {
        this.toastr.error(error.message);
        console.log(error);
      },
    );
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    console.log(this.checkoutForm.get('deliveryForm'));
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        .get('delivery').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    };
  }
}
