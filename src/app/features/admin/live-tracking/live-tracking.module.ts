import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTrackingRoutingModule } from './live-tracking-routing.module';
import { ManageLiveTrackingComponent } from './pages/manage-live-tracking/manage-live-tracking.component';
import { LiveMapTrackingComponent } from './component/live-map-tracking/live-map-tracking.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageLiveTrackingComponent,
    LiveMapTrackingComponent
  ],
  imports: [
    CommonModule,
    LiveTrackingRoutingModule,
    SharedModule
  ]
})
export class LiveTrackingModule { }
