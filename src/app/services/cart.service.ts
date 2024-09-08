import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private hostName: string = 'http://localhost:3300'
  private routeName: string = '/api/v1/carts'
  constructor(private _HttpClient: HttpClient) { }

  addProductToCart(product: string): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}
