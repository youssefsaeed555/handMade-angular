import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-saveitem',
  templateUrl: './saveitem.component.html',
  styleUrls: ['./saveitem.component.css']
})
export class SaveitemComponent implements OnInit{
  constructor(public myService: ServiceService) {}
  productinwish:any;
  token = localStorage.getItem('token')
  ID: any;
  _id:any;
  product: any;
  productWishData:any;
  ngOnInit(): void {


    this.myService.getProductWish(this.token).subscribe({
      next: (res) => {

        this.productinwish = res;
        this.productWishData=this.productinwish.data;
        console.log(res);
        // this.rate= this.products.rate;
      },
      error: (err) => {
        console.log(err);
      },
    });


}
addcart(id:any) {
  console.log(id);
  this.myService
    .addToCart(this.token, {
      productId: id,
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


deleteProductInWish(_id: any) {
  console.log(_id);

    this.myService.deleteFromWish(_id, this.token).subscribe({
      next:(data) => {
        console.log(data);

        this.productWishData = this.productWishData.filter(
          (s: { _id: any }) => s._id !== this._id
        );
      },
     error:(error) => {
        console.log(error);
      }
});
  }
}


