import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardManageRoutingModule } from './admin-dashboard-manage-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomeComponent } from './components/home/home.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TrackingMapComponent } from './components/tracking-map/tracking-map.component';
import { TrackingDetailComponent } from './components/tracking-detail/tracking-detail.component';
import { EmployeeChartComponent } from './components/employee-chart/employee-chart.component';
import { EmployeeCountingComponent } from './components/employee-counting/employee-counting.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    HomeComponent,
    TrackingMapComponent,
    TrackingDetailComponent,
    EmployeeChartComponent,
    EmployeeCountingComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule  ,
    NgxGraphModule,
    AdminDashboardManageRoutingModule
  ]
})
export class AdminDashboardManageModule { }
