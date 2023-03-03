import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(public myService: ServiceService) { }

  token = localStorage.getItem('token')
address:any;
  ngOnInit(): void {
    this.myService.getProductCart(this.token).subscribe({
      next: (res) => {
        this.address = res;
        console.log(res);
        // this.rate= this.products.rate;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
