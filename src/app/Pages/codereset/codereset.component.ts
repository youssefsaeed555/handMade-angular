import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-codereset',
  templateUrl: './codereset.component.html',
  styleUrls: ['./codereset.component.css']
})
export class CoderesetComponent {
  ValidCode: any;

  constructor(
    public myService: ServiceService,
    myActiveRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }
  data:any;
  code: any;
  isValid = false;

  get validCode() {
    return this.validationForm.controls['code'].valid;
  }
  validCodeClass() {
    return {
      'shadow-none border border-success':
        this.validCode && this.validationForm.controls['code'].value,
    };
  }

  validationForm = new FormGroup({
    code: new FormControl('', Validators.pattern('\d{6}')),

  });
  check() {
    // if (this.validCode) {
    this.code = { code: this.validationForm.value.code };
    console.log(this.code);
    this.myService
      .checkCode(this.code)
      .subscribe({

        next: (res) => {
          // this.code = res;
          this.data=res;
          console.log(res);
        },
        error(err) {
          console.log(err);
        },

      })
      console.log(this.data);

      if (this.data.message === "success") {
        this.isValid = true;
        this.router.navigate(['/resetpass']);
      }
      else{
        console.log("false")
        this.isValid = false;
        console.log('errr');
        this.showError();
        console.log(this.validCode);
      }


    // data) => console.log(data));
    // this.isValid = true;
    // this.router.navigate(['/resetpass']);
    // this.showSuccess();
    // }
    //  else {
    //   this.isValid = false;
    //   console.log('errr');
    //   this.showError();
    //   console.log(this.validCode);

    // }
  }

  showSuccess() {
    this.toastr.success('Code Correct', '', {
      titleClass: 'center',
      messageClass: 'center',

      progressBar: true,
    });
  }

  showError() {
    this.toastr.error('Code False', '', {
      titleClass: 'center',
      messageClass: 'center',
      progressBar: true,
    });
  }
}
