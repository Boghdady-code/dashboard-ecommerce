import { Component, OnDestroy, OnInit } from '@angular/core';
import { CouponsService } from '../coupons.service';
import { AlertService } from '../../shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent implements OnInit, OnDestroy {
  constructor(
    private alert: AlertService,
    private couponsService: CouponsService
  ) {}
  coupons: any[] = [];
  couponForm: FormGroup | undefined;
  mode = 'create';
  id: any;
  couponSubscription: Subscription | undefined;

  deleteCoupon(id: any) {
    this.couponsService.deleteCoupon(id).subscribe((res) => {
      console.log(res);
      this.alert.success.next('Coupon has been deleted successfully');
    });
  }

  createCoupon() {
    if (this.mode == 'create') {
      this.couponsService
        .createCoupon(this.couponForm?.value)
        .subscribe((res) => {
          console.log(res);
          this.alert.success.next('Coupon has been created successfully');
        });
    } else {
      this.couponsService
        .updateCoupon(this.id, this.couponForm?.value)
        .subscribe((res) => {
          console.log(res);
          this.alert.success.next('Coupon has been updated successfully');
          this.mode = 'create';
        });
    }
    this.couponForm?.reset();
  }

  editCoupon(id: any) {
    this.couponsService.getCoupon(id).subscribe((res) => {
      console.log(res);
      this.id = id;
      this.mode = 'update';
      const date = new Date(res.data.expires);
      this.couponForm?.get('name')?.setValue(res.data.name);
      this.couponForm?.get('discount')?.setValue(res.data.discount);
      this.couponForm
        ?.get('expires')
        ?.setValue(date.toISOString().split('T')[0]);
    });
  }

  ngOnInit(): void {
    this.couponForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      discount: new FormControl(null, [Validators.required]),
      expires: new FormControl(null, [Validators.required]),
    });
    this.couponSubscription = this.couponsService
      .getCoupons()
      .subscribe((res) => {
        this.coupons = res.data;
      });
  }

  ngOnDestroy(): void {
    this.couponSubscription?.unsubscribe();
  }
}
