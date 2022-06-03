import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { SettokensService } from 'src/app/Service/settokens.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./../Common.scss', './dashboard-header.component.scss',

  ],

})
export class DashboardHeaderComponent implements OnInit {
  constructor(private auth: AuthService, private user: SettokensService, private router: Router) {
  }
  username: any = "";
  roleid: any;
  ngOnInit(): void {
    this.username = this.user.firstname + " " + this.user.lastname;
    this.roleid = this.user.role_id;
  }
  Toggle() {
    var sidebar: any = "";
    sidebar = document.querySelector("#sidebar");
    var container: any = "";
    container = document.querySelector(".my-container");
    sidebar.classList.toggle("active-nav");
    container.classList.toggle("active-cont");
  }
  logout() {
    this.auth.Logout().subscribe(res => {
      if (res) {
        this.user.removeAll();
        this.auth.setHeaderObject();
      }
    }, err => {
      console.log(err);
    })
    this.router.navigate(['']);
  }

}
