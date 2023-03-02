import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';

// type Productwish = {
//   "name": string,
//   "price": string,
//   "img": string,
//   "description": string,
//   "id": number,
//   "quantity": number
// }

@Component({
  selector: 'app-saveitem',
  templateUrl: './saveitem.component.html',
  styleUrls: ['./saveitem.component.css']
})
export class SaveitemComponent implements OnInit{
  constructor(public myService: ServiceService) { }
  productinwish:any;
  ngOnInit(): void {
    this.myService.getProductWish().subscribe({


      next: (res) => {
        this.productinwish = res;
        console.log(res);
        // this.rate= this.products.rate;
      },
      error: (err) => {
        console.log(err);
      },

    });





}
AddtoCart(name: string, price: string, img: string, description: string, rate: string, quantity: number) {
  let productincart = {
    name, price, img, description, quantity, rate
  };
  this.myService.addToCart(productincart).subscribe();

}
removeFromwish(id: number) {
  this.myService.deletefromwish(id).subscribe()
}
}
