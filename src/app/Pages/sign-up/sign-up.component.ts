import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(
    public myService: ServiceService,
    myActiveRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  user: any;
  isValid = false;

  get validName() {
    return this.validationForm.controls['userName'].valid;
  }
  get validEmail() {
    return this.validationForm.controls['email'].valid;
  }
  get validPhone() {
    return this.validationForm.controls['phone'].valid;
  }

  get validpassword() {
    return (
      this.validationForm.value.password ===
        this.validationForm.value.confirmPassword &&
      this.validationForm.controls['password'].valid
    );
  }

  validNameClass() {
    return {
      'shadow-none border border-success':
        this.validName && this.validationForm.controls['userName'].value,
    };
  }

  validEmailClass() {
    return {
      'shadow-none border border-success':
        this.validEmail && this.validationForm.controls['email'].value,
    };
  }

  validPhoneClass() {
    return {
      'shadow-none border border-success':
        this.validPhone && this.validationForm.controls['phone'].value,
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
    userName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}$'),
      Validators.email,
      Validators.required,
    ]),
    phone: new FormControl('', Validators.pattern('^01[0125][0-9]{8}$')),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });
  signUp() {
    if (
      this.validName &&
      this.validEmail &&
      this.validPhone &&
      this.validpassword &&
      this.validationForm.value.gender
    ) {
      this.user = {
        email: this.validationForm.value.email,
        phone: this.validationForm.value.phone,
        userName: this.validationForm.value.userName,
        password: this.validationForm.value.password,
        confirmPassword: this.validationForm.value.confirmPassword,
        gender: this.validationForm.value.gender,
        profileImg: '',
      };
      console.log(this.user);
      this.myService
        .postNewuser(this.user)
        .subscribe((data) => console.log(data));
      this.isValid = true;
      this.router.navigate(['/signin']);
      // this.showSuccess();
    } else {
      this.isValid = false;
      console.log('errr');
      this.showError();
    }
  }

  showSuccess() {
    this.toastr.success('Successfully Registered', '', {
      titleClass: 'center',
      messageClass: 'center',
      // easing: 'ease-in',
      progressBar: true,
    });
  }

  showError() {
    this.toastr.error('Registered Failed', '', {
      titleClass: 'center',
      messageClass: 'center',
      // easing: 'ease-in',
      progressBar: true,
    });
  }
}
