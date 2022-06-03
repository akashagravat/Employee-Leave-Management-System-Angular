import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { AlertService } from 'src/app/service/sweetalert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = true;
  response: any = [];

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private auth: AuthenticationService, private alert: AlertService, private router: Router) {

  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  get email() {
    return this.loginform.get('email');
  }


  get password() {
    return this.loginform.get('password');
  }
  onSubmit() {
    if (this.email?.value !== "" && this.email?.valid && this.password?.valid && this.password.value !== "") {
      const values = {
        email: this.email.value,
        password: this.password.value
      }
      this.auth.loginUser(values).subscribe(
        result => {
          this.response = result;
          if (this.response.status === 422) {
            this.alert.alert(this.response.validation_error, '', "error")
          } else {
            this.router.navigate(['/dashboard']);
          }

        }
      )
      // console.log("it woek")
    }
  }
  getErrorMessage() {

    if (this.email?.hasError('required')) {
      return 'Please Enter a Email';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  getPassworderrr() {
    return this.password?.hasError('required') ? 'Please Enter a Password' : '';
  }

  ngOnInit() {

  }


}
