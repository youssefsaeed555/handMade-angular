import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-products-of-category',
  templateUrl: './products-of-category.component.html',
  styleUrls: ['./products-of-category.component.css'],
})
export class ProductsOfCategoryComponent implements OnInit {
  categoryID = 0;
  categories: any;
  products: any;
  prodsDetails: any;
  isStarred: boolean = false;
  searchKey: string = '';
  currentCategory: any;
  itemsPerPage: number = 5;
  totalProducts: any;
  p: number = 1;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  updateRating(r: any) {
    this.rating = r;
  }
  star() {
    this.isStarred = true;
  }

  unstar() {
    this.isStarred = false;
  }

  constructor(myActivated: ActivatedRoute, public myService: ServiceService) {
    this.categoryID = myActivated.snapshot.params['id'];
    console.log(this.categoryID);
  }

  ngOnInit(): void {
    this.myService.getProductsByCategory(this.categoryID).subscribe({
      next: (res) => {
        this.products = res;
        this.prodsDetails = this.products.data;
        this.currentCategory = this.prodsDetails[0].category.name;
        console.log(res);
        // this.rate= this.products.rate;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.myService.search.subscribe((val) => {
      this.searchKey = val;
    });
    // this.myService.getAllCategories().subscribe({
    //   next: (res) => {
    //     this.categories = res;
    //     console.log(this.categories);
    //     // this.categories.forEach((ele: any) => {
    //     //   if (ele.id == this.categoryID) this.currentCategory = ele.name;
    //     //   // console.log(ele.id);
    //     // });
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    // });

    // this.categories.array.forEach( (element: { id: number; }) => {

    //   if(element.id ==  this.categoryID)

    // });
  }

  // ngOnInit(): void {
  //   this.myService.getProductById(this.ID).subscribe({
  //     next:(res)=>{
  //       this.product = res;
  //     },error(err) {
  //       console.log(err);
  //     },
  //   });
  //   // throw new Error('Method not implemented.');
  // }
}
