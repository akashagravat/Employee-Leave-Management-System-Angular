import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SettokensService } from 'src/app/Service/settokens.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-view-all-leave',
  templateUrl: './view-all-leave.component.html',
  styleUrls: ['./view-all-leave.component.scss']
})
export class ViewAllLeaveComponent implements OnInit {

  constructor(private _auth: AuthService, private _token: SettokensService, private router: Router, private _alert: SweetalertService) { }
  roleid: string = '';
  dtOptions: any = '';
  res: any;
  displayTable: boolean = false;
  leaves: any;
  ngOnInit(): void {
    // console.log(this.router.url)
    if (this.router.url === "/dashboard/viewleave") {
      this.ViewLeave(0);
    }
    if (this.router.url === "/dashboard/viewapproovedleave") {
      this.ViewLeave(1);
    }
    if (this.router.url === "/dashboard/viewrejectedleave") {
      this.ViewLeave(2);
    }

    this.roleid = this._token.role_id;
  }
  ViewLeave(val: any) {
    this._auth.getLeaveRequest(val).subscribe(response => {
      this.res = response;
      if (this.res.status === 200) {
        this.leaves = this.res.leave;
        // this.dtOptions = this.res.leave.json();
        this.displayTable = true;
      }
    }, err => {
      this._alert.alert(err.statusText, '', 'warning');
    })
  }
  DeleteLeave(leaveid: any) {

    this._auth.deleteleave(leaveid).subscribe(response => {
      this.displayTable = false;
      this.res = response;
      if (this.res.status === 200) {
        if (this.router.url === "/dashboard/viewleave") {
          this.ViewLeave(0);
        }
        if (this.router.url === "/dashboard/viewapproovedleave") {
          this.ViewLeave(1);
        }
        if (this.router.url === "/dashboard/viewrejectedleave") {
          this.ViewLeave(2);
        }
      }
    }, err => {
      this._alert.alert(err.statusText, '', 'warning');
    });
    // console.log(leaveid)
  }
  EditLeave(leaveid: any) {
    this.router.navigateByUrl(`/dashboard/editleave/${leaveid}`);
  }
}
