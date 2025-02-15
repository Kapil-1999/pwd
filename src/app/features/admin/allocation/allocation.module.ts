import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllocationRoutingModule } from './allocation-routing.module';
import { ManagePoiComponent } from './poi-allocation/pages/manage-poi/manage-poi.component';
import { PoiAllocationListComponent } from './poi-allocation/component/poi-allocation-list/poi-allocation-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MangeDutyAllocationComponent } from './duty-allocation/pages/mange-duty-allocation/mange-duty-allocation.component';
import { DutyAllocationListComponent } from './duty-allocation/component/duty-allocation-list/duty-allocation-list.component';
import { CreatePoiComponent } from './poi-allocation/component/create-poi/create-poi.component';


@NgModule({
  declarations: [
    ManagePoiComponent,
    PoiAllocationListComponent,
    MangeDutyAllocationComponent,
    DutyAllocationListComponent,
    CreatePoiComponent
  ],
  imports: [
    CommonModule,
    AllocationRoutingModule,
    SharedModule
  ]
})
export class AllocationModule { }
