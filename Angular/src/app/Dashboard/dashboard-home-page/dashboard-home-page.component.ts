import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { SettokensService } from 'src/app/Service/settokens.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-dashboard-home-page',
  templateUrl: './dashboard-home-page.component.html',
  styleUrls: ['./dashboard-home-page.component.scss']
})
export class DashboardHomePageComponent implements OnInit {
  res: any = [];
  approoved = '';
  rejected = '';
  pending = '';
  allleave = '';
  roleid = '';
  constructor(private auth: AuthService, private _token: SettokensService, private alert: SweetalertService) { }

  ngOnInit(): void {
    // console.log(this._token.tokens);
    this.roleid = this._token.role_id;
    this.getCounts();
  }

  getCounts() {
    this.auth.getCountLeave().subscribe(response => {
      // console.log(response)
      this.res = response;
      if (this.res.status === 200) {
        this.approoved = this.res.Approoved;
        this.rejected = this.res.Reject;
        this.allleave = this.res.allleave;
        this.pending = this.res.pending;
      }
    }, err => {
      this.alert.alert(err.statusText, '', 'warning');
      // console.log(err.statusText);
    })
  }
}
