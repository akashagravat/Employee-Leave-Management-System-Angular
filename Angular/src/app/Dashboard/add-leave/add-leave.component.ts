import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SettokensService } from 'src/app/Service/settokens.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {
  username = '';
  res: any;
  leaverequest = new FormGroup({
    leavesubjects: new FormControl('', [Validators.required]),
    reasonforleaves: new FormControl('', [Validators.required]),
    leavestartdates: new FormControl('', [Validators.required]),
    leaveenddates: new FormControl('', [Validators.required]),
  });
  errors = {
    leavesubject: '',
    reasonforleave: '',
    leavestartdate: '',
    leaveenddate: '',
  }
  get leavesubjects() {
    return this.leaverequest.get('leavesubjects');
  }
  get reasonforleaves() {
    return this.leaverequest.get('reasonforleaves');
  }
  get leavestartdates() {
    return this.leaverequest.get('leavestartdates');
  }
  get leaveenddates() {
    return this.leaverequest.get('leaveenddates');
  }

  constructor(private _token: SettokensService, private _auth: AuthService, private _alert: SweetalertService, private router: Router) { }

  ngOnInit(): void {
    this.username = this._token.firstname + " " + this._token.lastname;
  }

  onSubmit() {
    if (this.leavesubjects?.value !== '' && this.reasonforleaves?.value !== '' && this.leavestartdates?.value !== '' && this.leaveenddates?.value !== '') {
      const item = {
        leavesubject: this.leavesubjects?.value,
        reasonforleave: this.reasonforleaves?.value,
        leavestartdate: this.leavestartdates?.value,
        leaveenddate: this.leaveenddates?.value,
      }
      this._auth.AddLeaveRequest(item).subscribe(response => {
        this.res = response;
        console.log(response)
        if (this.res.status === 200) {
          this.errors = {
            leavesubject: '',
            reasonforleave: '',
            leavestartdate: '',
            leaveenddate: '',
          };

          this._alert.alert(this.res.message, '', 'success');
          this.router.navigate(['/dashboard']);
        }
        if (this.res.status === 422) {
          this.errors = this.res.validation_error;
        }
      });
    }
  }

}
