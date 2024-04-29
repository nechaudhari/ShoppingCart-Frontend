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
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto:any): Observable<any>{
    return this.http.post(`${BASIC_URL}/admin/category`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${BASIC_URL}/`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  addProduct(productDto :any): Observable<any>{
    return this.http.post(`${BASIC_URL}/admin/product`, productDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProducts(): Observable<Category[]>{
    return this.http.get<Category[]>(`${BASIC_URL}/admin/products`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProductsByName(name:any): Observable<Category[]>{
    return this.http.get<Category[]>(`${BASIC_URL}/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteProduct(productId :any): Observable<any>{
    return this.http.delete(`${BASIC_URL}/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }
  
}
