import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { GlobalService } from '../services/global.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,SpinnerComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  subscription: any;
  orders: any[] = [];
  ordersLength: number = 0;
  page: number = 1;
  pagination: Pagination = {};
  search: string = ''
  productImage: string = '';
  loading: boolean = true;

  constructor(private _AuthService: AuthService, private _OrdersService: OrdersService, private _GlobalService: GlobalService) { }

  loadOrders() {
    this.subscription = this._OrdersService.getUserOrders(undefined, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.orders = res.data
        this.ordersLength = res.length
        this.pagination = res.pagination
        this.loading = false;
      }, error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders()
  }


  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadOrders();

  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
