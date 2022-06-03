import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './Service/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./component/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./component/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'dashboard', canActivate: [AuthguardGuard], loadChildren: () => import('./Dashboard/dashboard-header/dashboard-header.module').then(m => m.DashboardHeaderModule) },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
