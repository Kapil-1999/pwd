import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageLiveTrackingComponent } from './pages/manage-live-tracking/manage-live-tracking.component';

const routes: Routes = [
  {
    path : 'track', component: ManageLiveTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTrackingRoutingModule { }
