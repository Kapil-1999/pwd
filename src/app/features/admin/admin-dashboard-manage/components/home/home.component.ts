import { Component } from '@angular/core';
import * as L from 'leaflet';
import { DashboardService } from '../../service/dashboard.service';
import { CommonService } from '../../../../shared/services/common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dashboardData: any;
  userData: any;
  data: any = {
    userId: 0,
    desiId: 0,
    locId: 0
  }
  allUserList: any;
  isLoading: boolean = false;
  isChartLoding: boolean = false
  constructor(
    private dashboardService: DashboardService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getUserFromLocal()
    this.getDashboardCountData()
  }

  getDashboardCountData() {
    this.isChartLoding = true;
    this.dashboardService.getDashboardCount().subscribe((res: any) => {
      this.isChartLoding = false;
      this.dashboardData = res?.body?.result || null;
    })
  }

  getUserFromLocal() {
    this.userData = this.commonService.getUserDetails();
    this.data = {
      userId: 0,
      desiId: this.userData?.designation_id + 1,
      locId: this.userData?.locId
    }
    this.getAllUserDetails()
  }

  getAllUserDetails() {
    this.isLoading = true;
    this.dashboardService.userDetails(this.data).subscribe((res: any) => {
      this.isLoading = false
      this.allUserList = res?.body?.result || [];
    });
  }

  confirm(event: any) {
    if (event.type === '') {
      this.data = {
        userId: event?.data?.user_id,
        desiId: event?.data?.designation_id + 1,
        locId: this.userData?.locId
      }
      if (event?.data?.designation_id == 2) {
        if (event?.id == 3) {
          this.data['locId'] = `zone_${event?.data?.zone_id}`;
          this.data['desiId'] = event?.id
        } else if (event?.id == 4) {
          this.data['locId'] = `zone_${event?.data?.zone_id}`
          this.data['desiId'] = event?.id
        } else if (event?.id == 5) {
          this.data['locId'] = `zone_${event?.data?.zone_id}`
          this.data['desiId'] = event?.id
        } else if (event?.id == 6) {
          this.data['locId'] = `zone_${event?.data?.zone_id}`
          this.data['desiId'] = event?.id
        }
      } else if (event?.data?.designation_id == 3) {
        if (event?.id == 4) {
          this.data['locId'] = `circle_${event?.data?.circle_id}`
          this.data['desiId'] = event?.id
        } else if (event?.id == 5) {
          this.data['locId'] = `circle_${event?.data?.circle_id}`
          this.data['desiId'] = event?.id
        } else if (event?.id == 6) {
          this.data['locId'] = `circle_${event?.data?.circle_id}`
          this.data['desiId'] = event?.id
        }
      } else if (event?.data?.designation_id == 4) {
        if (event?.id == 5) {
          this.data['locId'] = `district_${event?.data?.district_id}`
          this.data['desiId'] = event?.id
        } else if (event?.id == 6) {
          this.data['locId'] = `district_${event?.data?.district_id}`
          this.data['desiId'] = event?.id
        }
      } else if(event?.data?.designation_id == 5) {
        if (event?.id == 6) {
          this.data['locId'] = `division_${event?.data?.division_id}`
          this.data['desiId'] = event?.id
        }
      }

      this.getAllUserDetails()
    } else {
      this.data = {
        userId: 0,
        desiId: this.userData?.designation_id + 1,
        locId: this.userData?.locId
      }
      this.getAllUserDetails()
    }

  }
}
 