import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-in-map',
  templateUrl: './user-in-map.component.html',
  styleUrl: './user-in-map.component.scss'
})
export class UserInMapComponent {
  userData: any;
  searchKeyword: any;
  loginUser: any;
  zoneList: any;
  circleList: any;
  cityList: any;
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

  liveForm!: FormGroup

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setInitialValue()
    this.getUserDetailData();
    this.getZoneData();
  }

  setInitialValue() {
    this.liveForm = this.fb.group({
      zone: [null],
      circle: [null],
      city: [null]
    })
  }

  getUserDetailData() {
    let user = this.commonService.getUserDetails();
    this.loginUser = user.full_name;
  };

  getZoneData() {
    this.commonService.zoneList(30).subscribe((res: any) => {
      this.zoneList = res?.body?.result || [];
      if (this.zoneList.length > 0 && this.zoneList.length === 1) {
        this.liveForm.controls['zone'].setValue(this.zoneList[0]);
        this.getCircleData(this.zoneList[0].value)
      } else {
        this.circleList = [];
        this.cityList = [];
        this.liveForm.controls['zone'].setValue(null);
        this.liveForm.controls['circle'].setValue(null);
        this.liveForm.controls['city'].setValue(null);
      }
    })
  }

  onChangeZone(event: any) {
    
    if (event?.value?.value) {
      this.getCircleData(event.value.value)
    } else {
      this.circleList = [];
      this.cityList = [];
      this.liveForm.controls['circle'].setValue(null);
      this.liveForm.controls['city'].setValue(null);
    }
  }

  getCircleData(id: any) {
    this.commonService.circleList(id).subscribe((res: any) => {
      this.circleList = res?.body?.result || [];
      if (this.circleList.length > 0 && this.circleList.length === 1) {
        this.liveForm.controls['circle'].setValue(this.circleList[0]);
        this.getCityData(this.circleList[0].value)
        this.liveForm.controls['city'].setValue(null);
      } else {        
        this.cityList = [];
        this.liveForm.controls['circle'].setValue(null);
        this.liveForm.controls['city'].setValue(null);
      }
    })
  }

  onChangeCircle(event: any) {
    if (event?.value?.value) {
      this.getCityData(event.value.value)
    } else {
      this.cityList = [];
      this.liveForm.controls['city'].setValue(null);
    }
  }

  getCityData(id: any) {
    this.commonService.cityList(id).subscribe((res: any) => {
      this.cityList = res?.body?.result || [];
      if (this.cityList.length > 0 && this.cityList.length === 1) {
        this.liveForm.controls['city'].setValue(this.cityList[0]);
      }
    })
  }
}
