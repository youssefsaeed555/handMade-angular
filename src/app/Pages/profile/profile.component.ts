import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  ID = 0;
  user: any;
  userData: any;
  isEdit = false;

  userName: any;
  phone: any;
  email: any;
  profileImg: any;
  gender: any;
  role: any;
  wishlist: any;
  addresses: any;

  token = localStorage.getItem('token');

  constructor(
    myActivated: ActivatedRoute,
    public myService: ServiceService,
    private toastr: ToastrService // private fileUploadService: FileUploadService
  ) {
    // this.ID = myActivated.snapshot.params['id'];
    // console.log(this.ID);
    // this.token = localStorage.getItem('token');
    // console.log(this.token);
  }

  ngOnInit(): void {
    // this.token = localStorage.getItem('token');
    // console.log(this.token);

    // console.log(header);
    this.myService.getCurrentUser(this.token).subscribe({
      next: (res) => {
        this.user = res;
        this.userData = this.user.data;

        this.userName = this.userData.userName;
        this.phone = this.userData.phone;
        this.email = this.userData.email;
        this.profileImg = this.userData.profileImg;
        this.gender = this.userData.gender;
        this.role = this.userData.role;
        this.wishlist = this.userData.wishlist;
        this.addresses = this.userData.addresses;

        console.log(this.user.data);
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
  // id(id: any, data: any) {
  //   throw new Error('Method not implemented.');
  // }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    // console.log(file);

    const formData = new FormData();
    formData.append('profileImg', file, file.name);
    this.myService.putProfileImg(this.token, formData).subscribe({
      next: (res) => {
        this.showSuccess('Profile Image updated Successfully');
      },
      error: (err) => {
        this.showerror('Failed to update Image!');
      },
    });
  }

  update() {
    let data = {
      userName: this.userName,
      phone: this.phone,
    };
    console.log(data);
    this.myService.putUserData(this.token, data).subscribe({
      next: (res) => {
        console.log(res);
        this.userData.userName = data.userName;
        this.userData.phone = data.phone;
        this.showSuccess('Data updated Successfully');
      },
      error: (err) => {
        console.log(err);
        this.showerror('failed to update data');
      },
    });
    this.isEdit = false;

    // console.log(this.user);
  }

  showSuccess(text: string) {
    this.toastr.success(text, '', {
      titleClass: 'center',
      messageClass: 'center',
      progressBar: true,
    });
  }

  showerror(text: string) {
    this.toastr.error(text, '', {
      titleClass: 'center',
      messageClass: 'center',
      progressBar: true,
    });
  }
}
