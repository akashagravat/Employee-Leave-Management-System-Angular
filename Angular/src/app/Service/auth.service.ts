import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SettokensService } from './settokens.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers_object: any;
  httpOptions: any;
  LaravelApi = "http://127.0.0.1:8000/";
  LaravelImage = "http://localhost:8000/storage/images/";
  API = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient, private token: SettokensService) {
    this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token.tokens);
    this.httpOptions = {
      headers: this.headers_object
    };
  }

  setHeaderObject() {
    this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token.tokens);
    this.httpOptions = {
      headers: this.headers_object
    };
  }


  registeruser(value: any) {
    return this.http.post(this.API + 'register', value);
  }

  loginUser(value: any) {
    return this.http.post(this.API + 'login', value);
  }

  getCountLeave() {
    this.setHeaderObject();
    if (this.token.role_id === '1') {
      return this.http.post(this.API + 'countallleaves', '', this.httpOptions);
    } else {
      return this.http.post(this.API + 'countleave', '', this.httpOptions);

    }
  }

  getLeaveRequest(approoved: any) {

    if (this.token.role_id === '2') {
      return this.http.post(this.API + 'getleave/' + approoved, '', this.httpOptions);
    }
    else {
      return this.http.post(this.API + 'getallrequest/' + approoved, '', this.httpOptions);
    }
  }

  deleteleave(id: any) {
    return this.http.post(this.API + 'leave/delete/' + id, '', this.httpOptions);
  }

  ShowLeave(id: any) {
    return this.http.post(this.API + 'leaverequest/show/' + id, '', this.httpOptions);
  }

  AddLeaveRequest(value: any) {
    return this.http.post(this.API + 'addleaaverequest', value, this.httpOptions);
  }

  EditLeaveRequest(value: any, id: any) {
    return this.http.post(this.API + 'leave/edit/' + id, value, this.httpOptions);
  }

  Logout() {
    return this.http.post(this.API + 'logout', '', this.httpOptions);
  }

  UpdateUserProfile(value: any) {
    return this.http.post(this.API + 'updateuser', value, this.httpOptions);
  }

  GetUser() {
    return this.http.post(this.API + 'me', '', this.httpOptions);
  }
}
