import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  //  let isLogin = true;

  constructor(
    public myService: ServiceService,
    myActiveRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  user: any;

  currentUser: any;
  token: any;
  userId: any;
  message: any;

  get validEmail() {
    return this.validationForm.controls['email'].valid;
  }

  get validpassword() {
    return this.validationForm.controls['password'].valid;
  }

  validEmailClass() {
    return {
      'shadow-none border border-success':
        this.validEmail && this.validationForm.controls['email'].value,
    };
  }

  validPasswordClass() {
    return {
      'shadow-none border border-success':
        this.validpassword && this.validationForm.controls['password'].value,
      // 'shadow-none border border-danger':
      //   !this.validpassword && this.validationForm.controls['password'].value,
    };
  }

  validationForm = new FormGroup({
    email: new FormControl('', [
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}$'),
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  signIn() {
    if (this.validEmail && this.validpassword) {
      this.user = {
        email: this.validationForm.value.email,
        password: this.validationForm.value.password,
      };
      console.log(this.user);
      this.myService.postLogin(this.user).subscribe({
        next: (data) => {
          this.currentUser = data;
          this.token = this.currentUser.token;
          this.userId = this.currentUser.userId;
          console.log(this.token, this.userId);
          localStorage.setItem('token', this.token);
          this.showSuccess();
          this.router.navigate(['/home']);
          this.location.replaceState('/home');
        },
        error: (err) => {
          this.showError();
          console.log(err);
        },
      });
      // this.isValid = true;
    } else {
      // this.isValid = false;
      console.log('errr');
    }
  }

  showSuccess() {
    this.toastr.success('Logged in Successfully', '', {
      titleClass: 'center',
      messageClass: 'center',
      // easing: 'ease-in',
      progressBar: true,
    });
  }

  showError() {
    this.toastr.error('Login Failed', '', {
      titleClass: 'center',
      messageClass: 'center',
      // easing: 'ease-in',
      progressBar: true,
    });
  }
}
