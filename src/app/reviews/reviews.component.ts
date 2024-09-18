import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';
import { Pagination } from '../interfaces/pagination';
import { GlobalService } from '../services/global.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  subscription: any;
  reviews: any[] = [];
  reviewsLength: number = 0;
  page: number = 1;
  pagination: Pagination = {};
  search: string = ''
  productImage: string = '';
  // editingReviewId: string | null = null;
  // updatedComment: string = '';


  constructor(private _AuthService: AuthService, private _ReviewsService: ReviewsService, private _GlobalService: GlobalService) { }

  loadReviews() {
    this.subscription = this._ReviewsService.getUserReviews(undefined, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination;
        this.reviewsLength = res.length;
      }
    })
  }

  deleteReview(reviewId: string) {
    this._ReviewsService.deleteUserReview(reviewId).subscribe({
      next: (res) => {
        this.loadReviews();
        alert('Review deleted successfully');
      }
    })
  }

  // editReview(reviewId: string, currentComment: string) {
  //   this.editingReviewId = reviewId;
  //   this.updatedComment = currentComment;
  // }


  // submitUpdate(reviewId: string) {
  //   this._ReviewsService.updateUserReview(reviewId, { comment: this.updatedComment }).subscribe({
  //     next: (res) => {
  //       this.loadReviews();
  //       this.cancelEdit();
  //       alert('Review updated successfully');
  //     },
  //     error: (err) => {
  //       console.error('Error updating review:', err);
  //     }
  //   });
  // }

  // cancelEdit() {
  //   this.editingReviewId = null;
  //   this.updatedComment = '';
  // }

  changePage(page: number) {
    this.page = page;
    this.loadReviews();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._GlobalService.productsImages;
    this.loadReviews();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
