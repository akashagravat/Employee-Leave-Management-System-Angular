import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SettokensService } from 'src/app/Service/settokens.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-edit-leave-request',
  templateUrl: './edit-leave-request.component.html',
  styleUrls: ['./edit-leave-request.component.scss']
})
export class EditLeaveRequestComponent implements OnInit {
  username = '';
  res: any;
  roleid: any;
  responses: any;
  leaveid: any;
  employeeid: any;
  isApprooved: any = 0;

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

  constructor(private _token: SettokensService, private _auth: AuthService, private activatedRoute: ActivatedRoute, private _alert: SweetalertService, private router: Router) { }

  ngOnInit(): void {
    this.leaveid = this.activatedRoute.snapshot.params['id'];
    this.getLeaveData();
    // console.log(this.leaveid)
    // this.username = this._token.firstname + " " + this._token.lastname;
    this.roleid = this._token.role_id;
  }

  onSubmit() {
    if (this.leavesubjects?.value !== '' && this.reasonforleaves?.value !== '' && this.leavestartdates?.value !== '' && this.leaveenddates?.value !== '') {
      const item = {
        leavesubject: this.leavesubjects?.value,
        reasonforleave: this.reasonforleaves?.value,
        leavestartdate: this.leavestartdates?.value,
        leaveenddate: this.leaveenddates?.value,
        approoved: this.isApprooved,
      }
      this._auth.EditLeaveRequest(item, this.employeeid).subscribe(response => {
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

  getLeaveData() {
    this._auth.ShowLeave(this.leaveid).subscribe(response => {
      this.responses = response;
      if (this.responses.status === 200) {
        this.responses = this.responses.leave[0];
        this.employeeid = this.responses.id;
        this.username = this.responses.user.first_name + " " + this.responses.user.last_name;
        this.leaverequest.get('leavesubjects')?.setValue(this.responses.Subject);
        this.leaverequest.get('reasonforleaves')?.setValue(this.responses.Reason);
        this.leaverequest.get('leavestartdates')?.setValue(this.responses.StartDate);
        this.leaverequest.get('leaveenddates')?.setValue(this.responses.EndDate);

        // console.log(this.responses);
      }
    }, err => {
      this._alert.alert(err.statusText, '', 'warning');
      // console.log(err.statusText);
    })
  }
  setApprooved(val: any) {
    this.isApprooved = val;
  }
}
