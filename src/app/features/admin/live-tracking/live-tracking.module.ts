import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTrackingRoutingModule } from './live-tracking-routing.module';
import { ManageLiveTrackingComponent } from './pages/manage-live-tracking/manage-live-tracking.component';
import { LiveMapTrackingComponent } from './component/live-map-tracking/live-map-tracking.component';
import { SharedModule } from '../../shared/shared.module';
import { UserInMapComponent } from './component/user-in-map/user-in-map.component';


@NgModule({
  declarations: [
    ManageLiveTrackingComponent,
    LiveMapTrackingComponent,
    UserInMapComponent,
  ],
  imports: [
    CommonModule,
    LiveTrackingRoutingModule,
    SharedModule
  ]
})
export class LiveTrackingModule { }
