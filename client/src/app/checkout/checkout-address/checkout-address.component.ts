import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAddress } from '../../shared/models/address';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  saveUserAddress() {
    const address = this.checkoutForm.get('addressForm').value;
    this.accountService.updateUserAddress(address).subscribe(
      (updAddress) => {
        this.toastr.success('Address updated');
        this.checkoutForm.get('addressForm').patchValue(updAddress);
      },
      (error) => {
        this.toastr.error(error.message);
      },
    );
  }
}
