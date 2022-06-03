import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';
import { register, registercontrol } from './register';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hides = true;
  response: any = [];
  errors: boolean = false;
  errorval: any = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: ''
  };

  @ViewChild('contactForm') contactForm!: NgForm;

  isSubmit = false;
  model = new register('', '', '', '', '');
  err = new registercontrol(false, false, false, false, false, false);
  constructor(private auth: AuthService, private alert: SweetalertService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.isSubmit = true;
    if (this.contactForm.value.firstname === "") {
      this.err.firstnameerr = true;
    }
    if (this.contactForm.value.lastname === "") {
      this.err.lastnameerr = true;
    }

    if (this.contactForm.value.email === "") {
      this.err.emailerr = true;
    }
    if (this.contactForm.value.password === "") {
      this.err.passworderr = true;
    }
    if (this.contactForm.value.confirmpassword === "") {
      this.err.confirmpassworderr = true;
    } else if (this.contactForm.value.confirmpassword === this.contactForm.value.password) {
      this.err.confirmpassworderrs = true;
    }
    if (this.err.firstnameerr === false && this.err.emailerr === false && this.err.lastnameerr === false && this.err.confirmpassworderr === false && this.err.passworderr === false) {

      let value = {
        fname: this.contactForm.value.firstname,
        lname: this.contactForm.value.lastname,
        email: this.contactForm.value.email,
        password: this.contactForm.value.password,
        cpassword: this.contactForm.value.confirmpassword
      }
      this.auth.registeruser(value).subscribe(res => {
        // console.log(res)
        this.response = res;

        if (this.response.status === 422) {
          this.errors = true;
          this.errorval = this.response.validation_error;

        }

        if (this.response.status === 200) {
          this.alert.alert(this.response.message, '', 'success');
          this.router.navigate(['login']);

        }
      });
      // console.log('it work')
    }

  }
}
