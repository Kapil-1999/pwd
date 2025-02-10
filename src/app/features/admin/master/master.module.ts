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
import { ManageDistrictMasterComponent } from './district-master/pages/manage-district-master/manage-district-master.component';
import { DistrictListComponent } from './district-master/component/district-list/district-list.component';
import { CreateDistrictComponent } from './district-master/component/create-district/create-district.component';
import { ManageDivisionMasterComponent } from './division-master/pages/manage-division-master/manage-division-master.component';
import { DivisionListComponent } from './division-master/component/division-list/division-list.component';
import { CreateDivisionComponent } from './division-master/component/create-division/create-division.component';
import { CrateChiefEngComponent } from './user-master/component/crate-chief-eng/crate-chief-eng.component';
import { CrateSupritendingEngComponent } from './user-master/component/crate-supritending-eng/crate-supritending-eng.component';
import { CrateExecutiveEngComponent } from './user-master/component/crate-executive-eng/crate-executive-eng.component';
import { CrateAssitantEngComponent } from './user-master/component/crate-assitant-eng/crate-assitant-eng.component';
import { CrateJuniorEngComponent } from './user-master/component/crate-junior-eng/crate-junior-eng.component';
import { ManageCategoryComponent } from './category-master/pages/manage-category/manage-category.component';
import { CategoryListComponent } from './category-master/component/category-list/category-list.component';
import { AddCategoryComponent } from './category-master/component/add-category/add-category.component';
import { ManageSubcategoryComponent } from './subcategory-master/pages/manage-subcategory/manage-subcategory.component';
import { SubcategoryListComponent } from './subcategory-master/component/subcategory-list/subcategory-list.component';
import { CreateSubcategoryComponent } from './subcategory-master/component/create-subcategory/create-subcategory.component';
import { ManageDepartmentComponent } from './department-master/pages/manage-department/manage-department.component';
import { DepartmentListComponent } from './department-master/component/department-list/department-list.component';
import { CreateDepartmentComponent } from './department-master/component/create-department/create-department.component';
import { ManageDesignationComponent } from './designation-master/pages/manage-designation/manage-designation.component';
import { DesignationListComponent } from './designation-master/component/designation-list/designation-list.component';
import { CreateDesignationComponent } from './designation-master/component/create-designation/create-designation.component';
import { ManageAreaComponent } from './area-master/pages/manage-area/manage-area.component';
import { AreaListComponent } from './area-master/component/area-list/area-list.component';
import { MaangeWorkComponent } from './work-master/pages/maange-work/maange-work.component';
import { WorkListComponent } from './work-master/component/work-list/work-list.component';
import { CreateAreaComponent } from './area-master/component/create-area/create-area.component';
import { AreaMapComponent } from './area-master/component/area-map/area-map.component';
import { CreateWorkComponent } from './work-master/component/create-work/create-work.component';
import { AreaGoogleMapComponent } from './area-master/component/area-google-map/area-google-map.component';


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
    CreateCircleComponent,
    ManageDistrictMasterComponent,
    DistrictListComponent,
    CreateDistrictComponent,
    DivisionListComponent,
    CreateDivisionComponent,
    ManageDivisionMasterComponent,
    CrateChiefEngComponent,
    CrateSupritendingEngComponent,
    CrateExecutiveEngComponent,
    CrateAssitantEngComponent,
    CrateJuniorEngComponent,
    ManageCategoryComponent,
    CategoryListComponent,
    AddCategoryComponent,
    ManageSubcategoryComponent,
    SubcategoryListComponent,
    CreateSubcategoryComponent,
    ManageDepartmentComponent,
    DepartmentListComponent,
    CreateDepartmentComponent,
    ManageDesignationComponent,
    DesignationListComponent,
    CreateDesignationComponent,
    ManageAreaComponent,
    AreaListComponent,
    MaangeWorkComponent,
    WorkListComponent,
    CreateAreaComponent,
    AreaMapComponent,
    CreateWorkComponent,
    AreaGoogleMapComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
