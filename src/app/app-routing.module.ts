import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/shared/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/shared/login/login/login.component';
import { AuthguardGuard } from './features/shared/services/authguard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: "admin",
    canActivate : [AuthguardGuard],
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/admin/admin.module").then(
        (m) => m.AdminModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
