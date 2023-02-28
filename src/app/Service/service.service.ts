import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private myClient: HttpClient) {}

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

  getCurrentUser(id: any) {
    return this.myClient.get(`${this.baseURL}/users/${id}`);
  }

  UpdateUserData(id: any, updateUser: any) {
    return this.myClient.put(`${this.baseURL}/users/${id}`, updateUser);
  }
}
