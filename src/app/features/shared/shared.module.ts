import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import {MatPaginatorModule} from '@angular/material/paginator';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { SwiperComponent } from './component/swiper/swiper.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProfileComponent } from './layout/profile/profile.component';
import { NgChartsModule } from 'ng2-charts';
import { LoaderComponent } from './component/loader/loader.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    LoginComponent,
    MainLayoutComponent,
    HeaderComponent,
    BreadcrumbComponent,
    SkeletonLoaderComponent,
    SearchFilterPipe,
    DeleteConfirmationComponent,
    SwiperComponent,
    ProfileComponent,
    LoaderComponent,
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
    FormsModule,
    MatPaginatorModule,
    BsDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CarouselModule,
    NgChartsModule,
    NgxSpinnerModule,
    AccordionModule,
    GoogleMapsModule
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
    DeleteConfirmationComponent,
    MatPaginatorModule,
    BsDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CarouselModule,
    SwiperComponent,
    NgChartsModule,
    NgxSpinnerModule,
    LoaderComponent,
    AccordionModule,
    GoogleMapsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DatePipe]
})
export class SharedModule { }
