import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Pagination } from '../interfaces/pagination';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, DescriptionPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  subscription: any;
  products: any[] = [];
  pagination: Pagination = {};
  imgDomain: string = '';
  search: string = '';
  page: number = 1;
  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService) { }

  loadProducts() {
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService.getProducts(16, this.page, undefined, this.search).subscribe((res) => {
      this.products = res.data;
      this.pagination = res.pagination
    })
  }



  changePage(page: number) {
    this.page = page;
    this.loadProducts()
  }

  ngOnInit(): void {
    this._AuthService.checkToken()
    this.loadProducts();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }
}
