import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePoiComponent } from './poi-allocation/pages/manage-poi/manage-poi.component';
import { MangeDutyAllocationComponent } from './duty-allocation/pages/mange-duty-allocation/mange-duty-allocation.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'POIAllocatedArea', component: ManagePoiComponent },
      { path: 'DutyAllocatedArea', component: MangeDutyAllocationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllocationRoutingModule { }
