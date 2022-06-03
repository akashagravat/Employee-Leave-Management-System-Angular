import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SettokensService } from 'src/app/Service/settokens.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  res: any = [];
  now = new Date().getTime();
  isSubmit: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(private auth: AuthService, private alert: SweetalertService, private tokenval: SettokensService, private router: Router) { }

  ngOnInit(): void {
  }
  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.loginForm.valid) {
      this.auth.loginUser(this.loginForm.value).subscribe(response => {
        this.res = response;
        console.log(response)
        if (this.res.status === 422) {
          this.alert.alert(this.res.validation_error, '', 'error')
        }

        else {
          // console.log(this.res)
          this.tokenval.addCookie(this.res.access_token, this.res.expires_in, this.res.user_detail.role_id, this.res.user_detail.first_name, this.res.user_detail.last_name, this.res.user_detail.id, this.res.user_detail.UserImage, this.res.user_detail.email, this.now)
          if (this.tokenval.tokens !== '' && this.tokenval.tokens !== null && this.tokenval.tokens !== undefined) {
            // console.log(this.tokenval.tokens)
            this.router.navigate(['dashboard']);
          }
          // this.alert.alert('Login Successfull !', '', 'success')
        }
      })
    }
    // console.log(this.loginForm.valid)
  }

  getPasswordErr() {
    if (this.password.hasError('required')) {
      return "Password is Required"
    }
    return "Enter Minimum 5 Length Password"
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return "Email Required"
    }
    return "Please Enter Valid Email"
  }
}