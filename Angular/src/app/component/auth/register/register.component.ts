import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { AlertService } from 'src/app/service/sweetalert/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  disabledval: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  fname = new FormControl('', [Validators.required]);
  lname = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@$')]);
  cpassword = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@$')]);
  errors: boolean = false;
  errorval: any = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: ''
  };

  constructor(private auth: AuthenticationService,
    private alert: AlertService,
    private routers: Router) { }
  response: any = [];
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please Enter a Email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPassworderrr() {
    if (this.password.hasError('required')) {
      return 'Please Enter a Password';
    }

    return this.password.hasError('pattern') ? "Enter Valid Password" : '';
  }
  getcPassworderrr() {
    if (this.cpassword.hasError('required')) {
      return 'Please Enter a Password';
    }
    else if (this.cpassword.value !== this.password.value) {
      return 'Password and Confirm Password Not Match';
    }
    return this.cpassword.hasError('pattern') ? "Enter Valid Password" : '';
  }

  register() {
    if (this.fname.valid && this.lname.valid && this.email.valid && this.cpassword.valid && this.password.valid) {
      let value = {
        fname: this.fname.value,
        lname: this.lname.value,
        email: this.email.value,
        password: this.password.value,
        cpassword: this.cpassword.value
      }
      this.auth.registeruser(value).subscribe(res => {
        this.response = res;
        if (this.response.status === 200) {
          console.log('it work')
        }

        if (this.response.status === 422) {
          this.errors = true;
          this.errorval = this.response.validation_error;
          // console.log(this.errorval.email)


        }
        if (this.response.status === 200) {
          // console.log('it wrk')
          // const newLocal = this.routers.navigate(['/login']);
          Swal.fire({
            title: this.response.message,
            icon: 'success'
          }).then(() => {
            this.fname.reset,
              this.lname.reset,
              this.email.reset,
              this.password.reset(),
              this.cpassword.reset()
          }
          );
        }
      });
    } else {
      // console.log(this.fname.value)
      //.controls['email'].setErrors({'incorrect': true});
    }
  }

  ngOnInit(): void {

    // console.log(this.fname.value)
  }
  ngOnChanges() {

  }


}
