import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageZoneMasterComponent } from './zone-master/pages/manage-zone-master/manage-zone-master.component';
import { Path } from 'leaflet';
import { ManageUserMasterComponent } from './user-master/pages/manage-user-master/manage-user-master.component';
import { ManageCircleMasterComponent } from './circle-master/pages/manage-circle-master/manage-circle-master.component';
import { ManageDistrictMasterComponent } from './district-master/pages/manage-district-master/manage-district-master.component';
import { ManageDivisionMasterComponent } from './division-master/pages/manage-division-master/manage-division-master.component';
import { ManageCategoryComponent } from './category-master/pages/manage-category/manage-category.component';
import { ManageSubcategoryComponent } from './subcategory-master/pages/manage-subcategory/manage-subcategory.component';
import { ManageDepartmentComponent } from './department-master/pages/manage-department/manage-department.component';
import { ManageDesignationComponent } from './designation-master/pages/manage-designation/manage-designation.component';
import { ManageAreaComponent } from './area-master/pages/manage-area/manage-area.component';
import { MaangeWorkComponent } from './work-master/pages/maange-work/maange-work.component';

const routes: Routes = [
  {
    path: '', children: [
     { path : 'department-master', component: ManageDepartmentComponent},
     { path : 'designation-master', component: ManageDesignationComponent},
     { path : 'zone-master', component: ManageZoneMasterComponent},
     { path : 'user-master', component: ManageUserMasterComponent},
     { path : 'circle-master', component: ManageCircleMasterComponent},
     { path : 'district-master', component: ManageDistrictMasterComponent},
     { path : 'division-master', component: ManageDivisionMasterComponent},
     { path : 'category-master', component: ManageCategoryComponent},
     { path : 'subcategory-master', component: ManageSubcategoryComponent},
     { path : 'area-master', component: ManageAreaComponent},
     { path : 'work-master', component: MaangeWorkComponent}  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
