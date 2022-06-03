import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { AuthService } from 'src/app/Service/auth.service';
import { SweetalertService } from 'src/app/Service/sweetalert.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  res: any;
  resval: any;
  isSubmit: boolean = false;
  accept: any;
  image: any;
  profileform = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    myfilename: new FormControl(''),
  });
  public listAccepts = [
    null,
    ".png",
    "image/*",
  ];

  @ViewChild('UploadFileInput')
  uploadFileInput!: ElementRef;

  profilephoto: any = "";
  // myfilename = '';
  err = {
    first_name: '',
    last_name: '',
  }
  get fname() {
    return this.profileform.get('fname');
  }
  get lname() {
    return this.profileform.get('lname');
  }
  get myfilename() {
    return this.profileform.get('myfilename');
  }


  constructor(private _auth: AuthService, private _alert: SweetalertService) { }

  ngOnInit(): void {
    this.GetUserDetails();
  }

  changeImage(e: any) {
    // console.log(e);
    this.profilephoto = e.target.files[0];
  }
  onSubmit() {
    this.isSubmit = true;
    console.log(this.myfilename?.value)
    if (this.fname?.value !== "" && this.lname?.value !== "") {
      const formData = new FormData();
      formData.append("first_name", this.fname?.value);
      formData.append("last_name", this.lname?.value);
      formData.append("profile", this.profilephoto);


      this._auth.UpdateUserProfile(formData).subscribe(response => {
        this.res = response;
        if (this.res.status === 200) {
          this._alert.alert(this.res.message, '', 'success');
          this.GetUserDetails();
        }
        console.log(response);

      }, err => {
        this._alert.alert(err.statusText, '', 'warning');
      });
    }
  }

  GetUserDetails() {
    this._auth.GetUser().subscribe(response => {
      this.resval = response;

      this.fname?.setValue(this.resval.first_name);
      this.lname?.setValue(this.resval.last_name);
      // this.myfilename?.setValue(this.resval.UserImage);
      this.image = this._auth.LaravelImage + this.resval.UserImage;
      // console.log(response)
    }, err => {
      this._alert.alert(err.statusText, '', 'warning');
    });
  }
}
