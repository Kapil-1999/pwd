import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ManageZoneMasterComponent } from './zone-master/pages/manage-zone-master/manage-zone-master.component';
import { ZoneListComponent } from './zone-master/component/zone-list/zone-list.component';
import { CreateZoneComponent } from './zone-master/component/create-zone/create-zone.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageZoneMasterComponent,
    ZoneListComponent,
    CreateZoneComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
