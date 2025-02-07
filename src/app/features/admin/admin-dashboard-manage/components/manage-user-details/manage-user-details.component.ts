import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';
import { CommonService } from '../../../../shared/services/common.service';
import { IMG_URL } from '../../../../shared/constant/menu/menu';
import { Location } from '@angular/common';

@Component({
  selector: 'manage-user-details',
  templateUrl: './manage-user-details.component.html',
  styleUrl: './manage-user-details.component.scss'
})
export class ManageUserDetailsComponent {
  isLoading: boolean = false;
  allUserList: any;
  data: any = {
    userId: 0,
    desiId: 0,
    locId: 0
  }
  userData: any;
  imgUrl = IMG_URL

  constructor(
    private dashboardService: DashboardService,
    private commonService: CommonService,
    private router : Router
  ) { }

  ngOnInit() {
    this.userData = history.state.userData;
    if (this.userData) {
      this.data['userId'] = this.userData?.user_id;
      this.data['desiId'] = this.userData?.ce_desig_id;
      this.getUserFromLocal()
    } 
  }

  getUserFromLocal() {
    this.userData = this.commonService.getUserDetails();
    this.data['locId'] = this.userData?.locId
    this.getAllUserDetails()
  }

  getAllUserDetails() {
    this.isLoading = true;
    this.dashboardService.userDetails(this.data).subscribe((res: any) => {
      this.isLoading = false
      this.allUserList = res?.body?.result || [];
    });
  }

  onGetUserBeasedOnId(data: any,id:any) {
    if (data?.designation_id == 2) {
      if (id == 3) {
        this.data['locId'] = `zone_${data?.zone_id}`;
        this.data['desiId'] = id
      } else if (id == 4) {
        this.data['locId'] = `zone_${data?.zone_id}`
        this.data['desiId'] = id
      } else if (id == 5) {
        this.data['locId'] = `zone_${data?.zone_id}`
        this.data['desiId'] = id
      } else if (id == 6) {
        this.data['locId'] = `zone_${data?.zone_id}`
        this.data['desiId'] = id
      }
    } else if (data?.designation_id == 3) {
      if (id == 4) {
        this.data['locId'] = `circle_${data?.circle_id}`
        this.data['desiId'] = id
      } else if (id == 5) {
        this.data['locId'] = `circle_${data?.circle_id}`
        this.data['desiId'] = id
      } else if (id == 6) {
        this.data['locId'] = `circle_${data?.circle_id}`
        this.data['desiId'] = id
      }
    } else if (data?.designation_id == 4) {
      if (id == 5) {
        this.data['locId'] = `district_${data?.district_id}`
        this.data['desiId'] = id
      } else if (id == 6) {
        this.data['locId'] = `district_${data?.district_id}`
        this.data['desiId'] = id
      }
    } else if(data?.designation_id == 5) {
      if (id == 6) {
        this.data['locId'] = `division_${data?.division_id}`
        this.data['desiId'] = id
      }
    }
    this.getAllUserDetails()
  }

  onAssignArea(userId:any, designationId : any) {
    this.router.navigateByUrl(`/admin/dashboard/${userId}/${designationId}/area-allot-details`)
  }

  goToLive(user:any) {
    console.log(user);
    this.router.navigateByUrl("/admin/live/track")
  }


}
