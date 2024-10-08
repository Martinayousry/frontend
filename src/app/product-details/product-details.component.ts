import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { FormControl,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,DatePipe,ReactiveFormsModule,SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  product: any = {};
  reviewError: string = '';
  selectedImage: string | null = null;
  loading: boolean = true;
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
  })
  constructor(private _ActivatedRoute: ActivatedRoute, private _ReviewsService: ReviewsService,
        private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService) { }

        loadProduct() {
              this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
                this.product = res.data
                this.loading = false;
              })
            }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe((res) => { alert('Product Added to wishlist') })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe((res) => {alert('Product Added to cart') })
  }
  addReview(productId: string, formData: FormGroup) {
    this._ReviewsService.addReview(productId, formData.value).subscribe({
      next: (res) => {
        this.loadProduct();
        alert('Review Added')
      },
      error: (err) => {
        if (err.error.errors) {
          err.error.errors.map((error: any) => {
            if (error.path === 'product') { this.reviewError = error.msg }
          })
        }
        else {
          this.reviewError = `login first to add review`;
        }
      }
    })
  }
  selectImage(image: string): void {
    this.selectedImage = this.imgDomain + image;
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.imgDomain = this._ProductsService.productImages;
    this.loadProduct()

  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
