import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageZoneMasterComponent } from './zone-master/pages/manage-zone-master/manage-zone-master.component';
import { Path } from 'leaflet';
import { ManageUserMasterComponent } from './user-master/pages/manage-user-master/manage-user-master.component';
import { ManageCircleMasterComponent } from './circle-master/pages/manage-circle-master/manage-circle-master.component';
import { ManageDistrictMasterComponent } from './district-master/pages/manage-district-master/manage-district-master.component';

const routes: Routes = [
  {
    path: '', children: [
     { path : 'zone-master', component: ManageZoneMasterComponent},
     { path : 'user-master', component: ManageUserMasterComponent},
     { path : 'circle-master', component: ManageCircleMasterComponent},
     { path : 'district-master', component: ManageDistrictMasterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
