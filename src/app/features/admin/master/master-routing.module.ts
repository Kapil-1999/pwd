import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageZoneMasterComponent } from './zone-master/pages/manage-zone-master/manage-zone-master.component';
import { Path } from 'leaflet';

const routes: Routes = [
  {
    path: '', children: [
     { path : 'zone-master', component: ManageZoneMasterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
