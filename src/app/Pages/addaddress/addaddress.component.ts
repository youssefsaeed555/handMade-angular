import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.css'],
})
export class AddaddressComponent implements OnInit{
  address: any;
  alias: any;
  token = localStorage.getItem('token');
  ID = 0;
  constructor(
    private myService: ServiceService,
    myActiveRoute: ActivatedRoute
  ) {
    this.ID = myActiveRoute.snapshot.params['id'];
  }

  get validName() {
    return this.validationForm.controls['name'].valid;
  }

  validationForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    country: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    city: new FormControl('', [Validators.minLength(3), Validators.required]),
    governorate: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    street: new FormControl('', []),
    build_no: new FormControl('', []),
  });

  ngOnInit(): void {}

  Add() {
    const address = {
      token: this.token,
      name: this.validationForm.value.name,
      country: this.validationForm.value.country,
      city: this.validationForm.value.city,
      governorate: this.validationForm.value.governorate,
      street: this.validationForm.value.street,
      build_no: this.validationForm.value.build_no,
      alias: this.alias,
    };
    console.log(address);
    this.myService.addNewAddress(address, this.token).subscribe();
  }
}
