import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private dashboard: DashboardService
  ) {}
  loggedUser: string | undefined;
  orders: any[] | undefined;
  products: any[] | undefined;
  categories: any[] | undefined;
  users: any[] | undefined;
  brands: any[] | undefined;
  latestProducts: any[] | undefined;
  ordersSubscription: Subscription | undefined;
  productsSubscription: Subscription | undefined;
  categoriesSubscription: Subscription | undefined;
  usersSubscription: Subscription | undefined;
  brandsSubscription: Subscription | undefined;
  latestProductsSubscription: Subscription | undefined;
  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.loggedUser = user?.name;
    });

    this.ordersSubscription = this.dashboard.getOrders().subscribe((res) => {
      this.orders = res.data;
      console.log(this.orders);
    });

    this.productsSubscription = this.dashboard
      .getProducts()
      .subscribe((res) => {
        this.products = res.data;
      });

    this.categoriesSubscription = this.dashboard
      .getCategories()
      .subscribe((res) => {
        this.categories = res.data;
      });

    this.usersSubscription = this.dashboard.getUsers().subscribe((res) => {
      this.users = res.data;
    });

    this.brandsSubscription = this.dashboard.getBrands().subscribe((res) => {
      this.brands = res.data;
    });

    this.latestProductsSubscription = this.dashboard
      .getLatestProducts({ limit: 9 })
      .subscribe((res) => {
        this.latestProducts = res.data;
      });
  }

  ngOnDestroy(): void {
    this.ordersSubscription?.unsubscribe();
    this.productsSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.usersSubscription?.unsubscribe();
    this.brandsSubscription?.unsubscribe();
    this.latestProductsSubscription?.unsubscribe();
  }
}
