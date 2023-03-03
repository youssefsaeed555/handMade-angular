import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private myClient: HttpClient) { }

  private baseURL = 'https://handmadeiti-api.onrender.com';

  getAllCategories() {
    return this.myClient.get(`${this.baseURL}/api/v1/categories`);
  }

  getAllProducts() {
    return this.myClient.get(`${this.baseURL}/api/v1/products/`);
  }

  getProductsByCategory(categoryId: any) {
    return this.myClient.get(
      `${this.baseURL}/api/v1/categories/${categoryId}/products`
    );
  }

  getProductById(id: any) {
    return this.myClient.get(`${this.baseURL}/api/v1/products/${id}`);
  }

  postNewuser(newUser: any) {
    return this.myClient.post(`${this.baseURL}/api/v1/auth/signup`, newUser);
  }

  postLogin(user: any) {
    return this.myClient.post(`${this.baseURL}/api/v1/auth/login`, user);
  }

  forgetpass(user:any){
    return this.myClient.post(`${this.baseURL}/api/v1/auth/forgetPassword`,user);
  }
  checkCode(code:any){
    return this.myClient.post(`${this.baseURL}/api/v1/auth/verifyCode`,code)
  }

  getCurrentUser(token: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization', token);
    return this.myClient.get(`${this.baseURL}/api/v1/user/getMe`, {
      headers,
    });
  }

  putProfileImg(token: any, newImg: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization', token);
    return this.myClient.put(
      `${this.baseURL}/api/v1/user/updatePhoto`,
      newImg,
      {
        headers,
      }
    );
  }

  putUserData(token: any, updateUser: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization',token);
    return this.myClient.put(
      `${this.baseURL}/api/v1/user/updateMe`,
      updateUser,
      {
        headers,
      }
    );
  }

  getListOfReviewsForProduct(prodId: any) {
    return this.myClient.get(
      `${this.baseURL}/api/v1/products/${prodId}/reviews`
    );
  }
  /*-----------------------------*/
  getProductCart(token:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization',token);
    return this.myClient.get(`${this.baseURL}/api/v1/cart/`, { headers });
  }
  getaddress(token:any){
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization',token);
    return this.myClient.get(`${this.baseURL}/api/v1/addresses/`, { headers });
  }
  getProductWish(token:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization',token);
    return this.myClient.get(`${this.baseURL}/api/v1/wishlist/`,{ headers });
  }
  addToCart(token:any,productId: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization',token);
    return this.myClient.post(`${this.baseURL}/api/v1/cart/`, productId, { headers });
  }
  addtowish(token:any,productId: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization',token);
    return this.myClient.post(`${this.baseURL}/api/v1/wishlist/`, productId, { headers });
  }


  deleteFromWish(id: any, token: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization', token);
    return this.myClient.delete(`${this.baseURL}/api/v1/wishlist/${id}`);
  }

  deleteFromCart(id: any, token: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    headers.append('Authorization', token);
    return this.myClient.delete(`${this.baseURL}/api/v1/cart/${id}`);
  }
}
