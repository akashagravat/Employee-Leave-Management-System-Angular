import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomePageComponent } from '../dashboard-home-page/dashboard-home-page.component';
import { ViewAllLeaveComponent } from '../view-all-leave/view-all-leave.component';
import { AddLeaveComponent } from '../add-leave/add-leave.component';
import { ShowSpecificLeaveComponent } from '../show-specific-leave/show-specific-leave.component';
import { EditLeaveRequestComponent } from '../edit-leave-request/edit-leave-request.component';
import { AdminguardGuard } from 'src/app/Service/adminguard.guard';
import { MyprofileComponent } from '../myprofile/myprofile.component';

const routes: Routes = [
  { path: '', component: DashboardHomePageComponent },
  { path: 'viewleave', component: ViewAllLeaveComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'viewapproovedleave', component: ViewAllLeaveComponent },
  { path: 'viewrejectedleave', component: ViewAllLeaveComponent },
  { path: 'addleave', canActivate: [AdminguardGuard], component: AddLeaveComponent },
  { path: 'show/:id', component: ShowSpecificLeaveComponent },
  { path: 'editleave/:id', component: EditLeaveRequestComponent },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],

})

export class DashboardHeaderModule { }
