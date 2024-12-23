import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule  
  ],
  exports : [
  HeaderComponent
  ],
})
export class SharedModule { }
