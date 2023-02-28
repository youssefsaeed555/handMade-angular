import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public myService: ServiceService) {}
  isStarred: boolean = false;

  star() {
    this.isStarred = true;
  }

  unstar() {
    this.isStarred = false;
  }

  categories: any;
  categDetails: any;
  products: any;
  prodDetails: any;
  // rate:any;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.myService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.categDetails = this.categories.data;
        // console.log(this.categories.data);
      },
      error(err) {
        console.log(err);
      },
    });

    this.myService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.prodDetails = this.products.data;
        console.log(this.products.data);
        // this.rate= this.products.rate;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // myFunction(x: any) {
  //   x.classList.toggle('fa-thumbs-down');
  // }
}
