import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.css'],
})
export class UpdateaddressComponent implements OnInit {
  id: any;
  address: any;
  name: any;
  country: any;
  city: any;
  governorate: any;
  street: any;
  build_no: any;
  token = localStorage.getItem('token');
  constructor(private myService: ServiceService, route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.myService.getAddressById(this.id, this.token).subscribe({
      next: (res) => {
        this.address = res;
        this.name = this.address.name;
        this.country = this.address.country;
        this.city = this.address.city;
        this.governorate = this.address.governorate;
        this.street = this.address.street;
        this.build_no = this.address.build_no;
      },
    });
  }
  // update() {
  //   let data = {
  //     name: this.name,
  //     country: this.country,
  //     city: this.city,
  //     governorate: this.governorate,
  //     street: this.street,
  //     build_no: this.build_no,
  //     // address: {
  //     // },
  //   };
  //   this.address = data;
  //   this.myService.updateAddress(this.id, data).subscribe();
  // }
}
