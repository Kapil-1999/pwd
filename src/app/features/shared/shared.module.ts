import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { TableModule } from 'ngx-easy-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from "ngx-bootstrap/modal";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SkeletonLoaderComponent } from './component/skeleton-loader/skeleton-loader.component';
import { SearchFilterPipe } from './pipe/serach.pipe';
import { DeleteConfirmationComponent } from './component/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    LoginComponent,
    MainLayoutComponent,
    HeaderComponent,
    BreadcrumbComponent,
    SkeletonLoaderComponent,
    SearchFilterPipe,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({}),
    TableModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    SelectDropDownModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ToastrModule,
    BreadcrumbComponent,
    TableModule,
    NgxPaginationModule,
    ModalModule,
    SelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
    SkeletonLoaderComponent,
    SearchFilterPipe,
    DeleteConfirmationComponent
  ],
})
export class SharedModule { }
