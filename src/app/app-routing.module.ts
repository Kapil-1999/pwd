import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'',component:MainLayoutComponent
  },
  {
    path: "admin",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/admin/admin.module").then(
        (m) => m.AdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
