import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  constructor(public myService: ServiceService) {}
  address: any;
  userID: any;
  _id: any;
  token = localStorage.getItem('token');
  //Calling API
  ngOnInit(): void {
    this.myService.getAddress(this.token).subscribe({
      next: (res) => {
        this.address = res;
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  deleteAddress(_id: any) {
    if (confirm(`Are you sure you want to delete this Address ?`)) {
      this.myService.deleteAddress(_id, this.token).subscribe(
        (data) => {
          this.address = this.address.data.filter(
            (s: { _id: any }) => s._id !== this._id
          );
        },
        (error) => {}
      );
    }
  }
}


