import { Component, OnInit, Type } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';

type Product = {
  "name": string,
  "price": string,
  "img": string,
  "description": string,
  "id": number,
  "quantity": number
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  constructor(public myService: ServiceService) { }

  totalPrice: number = 0;
  allprice: number = 0;
  cartProduct: any;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.myService.getProductCart().subscribe({
      next: (res) => {
        this.cartProduct = res;
        console.log(res);
        // this.rate= this.products.rate;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProduct(id: number) {
    this.myService.deletefromcart(id).subscribe()
  }

  incrementProduct(product: Product) {
    return product.quantity++;
  }

  decrementProduct(product: Product) {
    return product.quantity--;
  }

  calcProductTotal(product: Product) {
    return +product.quantity * +product.price
  }

  // checkButtonDisabled(product: Product) {
  //   return +product.quantity == 1 ? true : false
  // }

  calcTotal(products: Product[]) {
    return products.reduce((acc: number, current: Product) => {
      return +acc + +current.price * +current.quantity
    }, 0)
  }
}

