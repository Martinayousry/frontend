import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private hostName: string = 'http://localhost:3000'
  private routeName: string = '/api/v1/products'
  imgDomain: string = `${this.hostName}/products/`
  constructor(private _HttpClient: HttpClient) { }

  getProducts(limit: number = 16, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getOneProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${id}`)
  }
}
