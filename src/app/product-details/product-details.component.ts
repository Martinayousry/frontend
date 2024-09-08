import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  product: any = {};
  constructor(private _AuthService: AuthService, private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,private _WishlistService:WishlistService,private _CartService:CartService) { }
  ngOnInit(): void {
    this._AuthService.checkToken()
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
      this.product = res.data
    })
  }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe((res) => { alert('Product Added to wishlist') })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => {alert('Product Added to cart') })
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
