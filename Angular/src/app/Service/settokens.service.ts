import { Injectable, Component } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SettokensService {
  expiration = '';
  tokens = '';
  role_id = '';
  firstname = '';
  lastname = '';
  userid = '';
  UserImage = '';
  email = '';
  time = '';
  cookies!: Object;
  keys!: Array<string>;
  cName!: string;
  cValue!: string;
  rName!: string;
  checkName!: string;
  constructor() {
    this.update();
  }
  update() {
    this.cookies = Cookie.getAll();
    this.tokens = Cookie.get('tokens');
    this.expiration = Cookie.get('expiration');
    this.role_id = Cookie.get('role_id');
    this.firstname = Cookie.get('firstname');
    this.lastname = Cookie.get('lastname');
    this.userid = Cookie.get('userid');
    this.UserImage = Cookie.get('UserImage');
    this.email = Cookie.get('email');
    this.time = Cookie.get('time');
    this.keys = Object.keys(this.cookies);
    // this._auth.setHeaderObject();

  }
  addCookie(token: any, expires_in: any, roleid: any, firstname: any, lastname: any, id: any, userimage: any, email: any, time: any) {
    Cookie.set('tokens', token);
    Cookie.set('expiration', expires_in);
    Cookie.set('role_id', roleid);
    Cookie.set('firstname', firstname);
    Cookie.set('lastname', lastname);
    Cookie.set('userid', id);
    Cookie.set('UserImage', userimage);
    Cookie.set('email', email);
    Cookie.set('time', time);
    this.update();
  }

  removeAll() {
    Cookie.deleteAll();
    this.update();

  }
}
