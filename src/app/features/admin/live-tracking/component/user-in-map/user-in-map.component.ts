import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'user-in-map',
  templateUrl: './user-in-map.component.html',
  styleUrl: './user-in-map.component.scss'
})
export class UserInMapComponent {
  userData:any;
  searchKeyword:any;
  loginUser: any;
  zoneList :any;
  circleList:any;
  cityList:any;
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: 'Select Zone'
  };
  config1 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: 'Select Circle'

  };
  config2 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: 'Select City'

  };

  constructor(
    private commonService : CommonService
  ){}

  ngOnInit() {
    this.getUserDetailData();
    this.getZoneData();
  }

  getUserDetailData() {
    let user = this.commonService.getUserDetails();
    this.loginUser = user.full_name;
  };

  getZoneData() {
    this.commonService.zoneList(30).subscribe((res:any) => {
      this.zoneList = res?.body?.result;
    })
  }

  onChangeZone(event:any) {
    if (event?.value?.value) {
      this.getCircleData(event.value.value)
    }
    
  }

  getCircleData(id:any) {
    this.commonService.circleList(id).subscribe((res:any) => {
      this.circleList = res?.body?.result;
    })
  }

  onChangeCircle(event:any) {
    if (event?.value?.value) {
      this.getCityData(event.value.value)
    }
  }

  getCityData(id:any) {
    this.commonService.cityList(id).subscribe((res:any) => {
      this.cityList = res?.body?.result;
    })
  }
}
