import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ManageZoneMasterComponent } from './zone-master/pages/manage-zone-master/manage-zone-master.component';
import { ZoneListComponent } from './zone-master/component/zone-list/zone-list.component';
import { CreateZoneComponent } from './zone-master/component/create-zone/create-zone.component';
import { SharedModule } from '../../shared/shared.module';
import { ManageUserMasterComponent } from './user-master/pages/manage-user-master/manage-user-master.component';
import { UserListComponent } from './user-master/component/user-list/user-list.component';
import { CreateUserComponent } from './user-master/component/create-user/create-user.component';
import { ManageCircleMasterComponent } from './circle-master/pages/manage-circle-master/manage-circle-master.component';
import { CircleListComponent } from './circle-master/component/circle-list/circle-list.component';
import { CreateCircleComponent } from './circle-master/component/create-circle/create-circle.component';


@NgModule({
  declarations: [
    ManageZoneMasterComponent,
    ZoneListComponent,
    CreateZoneComponent,
    ManageUserMasterComponent,
    UserListComponent,
    CreateUserComponent,
    ManageCircleMasterComponent,
    CircleListComponent,
    CreateCircleComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
