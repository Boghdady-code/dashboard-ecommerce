import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons/coupons.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CouponsComponent],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CouponsModule {}
