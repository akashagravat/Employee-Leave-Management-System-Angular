import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-show-specific-leave',
  templateUrl: './show-specific-leave.component.html',
  styleUrls: ['./show-specific-leave.component.scss']
})
export class ShowSpecificLeaveComponent implements OnInit {
  leaveid: any;
  res: any;
  display: boolean = false;
  userleave: any;
  constructor(private activatedRoute: ActivatedRoute, private _auth: AuthService, private _alert: SweetalertService) {
  }

  ngOnInit(): void {
    this.leaveid = this.activatedRoute.snapshot.params['id'];
    this.GetUserLeave();
  }
  GetUserLeave() {
    this._auth.ShowLeave(this.leaveid).subscribe(response => {
      this.res = response;
      if (this.res.status === 200) {
        this.userleave = this.res.leave[0];
        this.display = true;
      }
    }, err => {
      this._alert.alert(err.statusText, '', 'warning');
    })
  }

}
