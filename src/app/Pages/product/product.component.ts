import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  isStarred: boolean = false;

  token = localStorage.getItem('token');
  ID: any;
  product: any;
  prodData!: any;
  reviews: any;
  reviewsData: any;
  reviewsListLength: any;
  constructor(myActivated: ActivatedRoute, public myService: ServiceService) {
    this.ID = myActivated.snapshot.params['id'];
    console.log(this.ID);
  }

  ngOnInit(): void {
    console.log(this.ID);
    this.myService.getProductById(this.ID).subscribe({
      next: (res) => {
        this.product = res;
        this.prodData = this.product.data;
        console.log(this.product.data);
      },
      error(err) {
        console.log(err);
      },
    });

    this.myService.getListOfReviewsForProduct(this.ID).subscribe({
      next: (res) => {
        this.reviews = res;
        this.reviewsData = this.reviews.data;
        this.reviewsListLength = this.reviewsData.length;
        console.log(this.reviews, this.reviewsData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  star() {
    this.isStarred = true;
  }

  unstar() {
    this.isStarred = false;
  }

  addcart() {
    console.log(this.ID);
    this.myService
      .addToCart(this.token, {
        productId: this.ID,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addwishes() {
    console.log(this.ID);
    this.myService
      .addtowish(this.token, {
        productId: this.ID,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
// reviews() {
//   return { 'd-none': !this.prodData.reviews };
// }

// export class ProdData {
//   _id: any;
//   title: any;
//   slug: any;
//   description: any;
//   quantity: any;
//   sold: any;
//   price: any;
//   colors: any;
//   imageCover: any;
//   images: any;
//   category: any;
//   ratingQuantity: any;
//   createdAt: any;
//   updatedAt: any;
//   reviews: any;
// }
