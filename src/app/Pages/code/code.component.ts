import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent {
  constructor(
    public myService: ServiceService,
    myActiveRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  user: any;
  currentUser: any;
  token: any;
  userId: any;
  message: any;

  get validEmail() {
    return this.validationForm.controls['email'].valid;
  }

  validEmailClass() {
    return {
      'shadow-none border border-success':
        this.validEmail && this.validationForm.controls['email'].value,
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
    if (this.validEmail ) {
      this.user = {
        email: this.validationForm.value.email,

      };
      console.log(this.user);
      this.myService.forgetpass(this.user).subscribe({
        next: (data) => {
          this.currentUser = data;
          this.token = this.currentUser.token;
          this.userId = this.currentUser.userId;
          console.log(this.token, this.userId);
          localStorage.setItem('token', this.token);
          this.showSuccess();
          this.router.navigate(['/codetoreset']);
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
    this.toastr.success('Email Correct', '', {
      titleClass: 'center',
      messageClass: 'center',
      // easing: 'ease-in',
      progressBar: true,
    });
  }

  showError() {
    this.toastr.error('Email Not Correct', '', {
      titleClass: 'center',
      messageClass: 'center',
      // easing: 'ease-in',
      progressBar: true,
    });
  }
}
