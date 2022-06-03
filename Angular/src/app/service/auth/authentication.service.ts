import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
API = "http://127.0.0.1:8000/api/";
  registeruser(value: any) {
    return this.http.post(this.API+'register', value);
  }

  loginUser(value:any){
    return this.http.post(this.API+'login', value);
  }
}
