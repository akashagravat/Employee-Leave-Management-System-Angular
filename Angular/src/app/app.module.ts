import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import * as $ from "jquery"
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FooterComponent } from './Dashboard/footer/footer.component';
import { DashboardHeaderComponent } from './Dashboard/dashboard-header/dashboard-header.component';
import { SideNavbarComponent } from './Dashboard/side-navbar/side-navbar.component';
import { DashboardHomePageComponent } from './Dashboard/dashboard-home-page/dashboard-home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewAllLeaveComponent } from './Dashboard/view-all-leave/view-all-leave.component';
import { AddLeaveComponent } from './Dashboard/add-leave/add-leave.component';
import { DataTablesModule } from 'angular-datatables';
import { ShowSpecificLeaveComponent } from './Dashboard/show-specific-leave/show-specific-leave.component';
import { EditLeaveRequestComponent } from './Dashboard/edit-leave-request/edit-leave-request.component';
import { MyprofileComponent } from './Dashboard/myprofile/myprofile.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardHeaderComponent,
    SideNavbarComponent,
    DashboardHomePageComponent,
    ViewAllLeaveComponent,
    AddLeaveComponent,
    ShowSpecificLeaveComponent,
    EditLeaveRequestComponent,
    MyprofileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgbModule,
    NgxMatFileInputModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
