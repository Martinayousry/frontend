import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CurrencyPipe,DescriptionPipe,RouterLink],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss'
})
export class BestSellingComponent implements OnInit, OnDestroy {
  subscription: any;
  imgDomain: string = '';
  search: string = '';
  products: any[] = []

  constructor( private _ProductsService: ProductsService,private _CartService:CartService) { }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => { alert('Product Added to cart') })
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.subscription = this._ProductsService.getProducts(16, 1, '-sold', this.search).subscribe((res) => {
      this.products = res.data;
    })
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }
}
