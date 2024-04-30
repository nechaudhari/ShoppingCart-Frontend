import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080"

interface Category {
    id: number;
    name: string;
    description: string;
  }
  
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Category[]>{
    return this.http.get<Category[]>(`${BASIC_URL}/customer/products`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name:any): Observable<Category[]>{
    return this.http.get<Category[]>(`${BASIC_URL}/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addToCart(productId): Observable<Category[]>{
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post<Category[]>(`${BASIC_URL}/customer/cart`, cartDto,  {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  applyCoupon(code:any): Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    })
  }


  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }
}
