import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryTrackingRoutingModule } from './history-tracking-routing.module';
import { ManageHistoryComponent } from './pages/manage-history/manage-history.component';
import { HistoryMapComponent } from './component/history-map/history-map.component';
import { SharedModule } from '../../shared/shared.module';
import { HistoryFilterComponent } from './component/history-filter/history-filter.component';


@NgModule({
  declarations: [
    ManageHistoryComponent,
    HistoryMapComponent,
    HistoryFilterComponent
  ],
  imports: [
    CommonModule,
    HistoryTrackingRoutingModule,
    SharedModule
  ]
})
export class HistoryTrackingModule { }
