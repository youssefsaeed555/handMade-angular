import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  ID = 0;
  user: any;
  isEdit = false;
  name: any;
  phone: any;
  email: any;
  img: any;
  password: any;
  gender: any;
  rule: any;

  token: any;

  constructor(myActivated: ActivatedRoute, public myService: ServiceService) {
    this.ID = myActivated.snapshot.params['id'];
    console.log(this.ID);
    this.token = localStorage.getItem('token');
    console.log(this.token);
  }

  ngOnInit(): void {
    this.myService.getCurrentUser(this.ID).subscribe({
      next: (res) => {
        this.user = res;
        this.name = this.user.name;
        this.phone = this.user.phone;
        this.email = this.user.email;
        this.img = this.user.img;
        this.password = this.user.password;
        this.gender = this.user.gender;
        this.rule = this.user.rule;
      },
      error(err) {
        console.log(err);
      },
    });
    // throw new Error('Method not implemented.');
  }

  isEditFun() {
    this.isEdit = !this.isEdit;
  }
  id(id: any, data: any) {
    throw new Error('Method not implemented.');
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    console.log(file);
  }

  update() {
    let data = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      img: this.img,
      password: this.password,
      gender: this.gender,
      rule: this.rule,
    };
    console.log(data);
    this.myService.UpdateUserData(this.ID, data).subscribe();
    this.isEdit = false;
    this.user = data;
    console.log(this.user);
  }
}
