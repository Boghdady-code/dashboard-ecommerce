import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { AlertService } from '../../shared/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  constructor(
    private ordersService: OrdersService,
    private alert: AlertService
  ) {}
  orders?: any[] = [];
  totalDocs: number = 0;
  ordersSubscription: Subscription | undefined;

  onPageChange(event: any) {
    console.log(event);
    this.ordersService
      .getOrders({ limit: 10, page: event.pageIndex + 1 })
      .subscribe((res) => {
        this.orders = res.data;
      });
  }
  payOrder(value: any) {
    this.ordersService.onPayOrder(value).subscribe((res) => {
      this.alert.success.next(res.message);
    });
  }

  deliveredOrder(value: any) {
    this.ordersService.onDeliverOrder(value).subscribe((res) => {
      this.alert.success.next(res.message);
    });
  }

  ngOnInit(): void {
    this.ordersSubscription = this.ordersService
      .getOrders({ limit: 10 })
      .subscribe((res) => {
        this.orders = res.data;
        this.totalDocs = res.paginationResult.totalDocuments;
      });
  }

  ngOnDestroy(): void {
    this.ordersSubscription?.unsubscribe();
  }
}
