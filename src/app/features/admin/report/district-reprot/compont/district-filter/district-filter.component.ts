import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'district-filter',
  templateUrl: './district-filter.component.html',
  styleUrl: './district-filter.component.scss'
})
export class DistrictFilterComponent {
   @Output() filterData = new EventEmitter()
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder : 'Select Zone',
    searchPlaceholder: 'Search Zone'
  }
  config1 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder : 'Select Circle',
    searchPlaceholder: 'Search Circle'

  }
  config2 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder : 'Select City',
    searchPlaceholder: 'Search City'
  }
  zoneList :any;
  circleList :any;
  cityList :any;
  districtForm ! : FormGroup
  constructor(
    private commonService : CommonService,
    private fb : FormBuilder
  ) {}

  ngOnInit() {
    this.setIninitValue()
    this.getZoneList()
  }

  setIninitValue() {
    this.districtForm = this.fb.group({
      zone : [null],
      circle : [null],
      city : [null],
    })
  }

  getZoneList() {
    this.commonService.zoneList(30).subscribe((res:any) => {
      this.zoneList = res?.body?.result || []; 
      if(this.zoneList.length > 0 && this.zoneList.length === 1) {
        this.districtForm.controls['zone'].setValue(this.zoneList[0]);
        this.getCircleList(this.zoneList[0].value);
        // this.onSubmit(this.districtForm.value)
      } else {
        this.districtForm.controls['zone'].setValue(null);
        this.districtForm.controls['circle'].setValue(null);
        this.districtForm.controls['city'].setValue(null);
      }
    })
  }

  onChangeZone(event:any) {
    if (event?.value?.value) {
      this.getCircleList(event.value.value)
    } else {
      this.circleList = [];
      this.cityList = []
      this.districtForm.controls['circle'].setValue(null);
      this.districtForm.controls['city'].setValue(null);
    }
    this.onSubmit(this.districtForm.value)

  }

  getCircleList(id:any) {
    this.commonService.circleList(id).subscribe((res:any) => {
      this.circleList = res?.body?.result || []
      if(this.circleList.length > 0 && this.circleList.length === 1) {
        this.districtForm.controls['circle'].setValue(this.circleList[0]);
        this.getCityList(this.circleList[0].value)
        this.onSubmit(this.districtForm.value)
      } else {
        this.districtForm.controls['circle'].setValue(null);
        this.districtForm.controls['city'].setValue(null);
      }
    })
  }

  onChangeCircle(event:any) {
    if (event?.value?.value) {
      this.getCityList(event.value.value)
    } else {
      this.cityList = []
      this.districtForm.controls['city'].setValue(null);
    }
    this.onSubmit(this.districtForm.value)
  }

  getCityList(id:any) {
    this.commonService.cityList(id).subscribe((res:any) => {
      this.cityList = res?.body?.result || [];
      if(this.cityList.length > 0 && this.cityList.length === 1) {
        this.districtForm.controls['city'].setValue(this.cityList[0]);
        this.onSubmit(this.districtForm.value)
      } else {
        this.districtForm.controls['city'].setValue(null);
      }
    })
  }

  onSubmit(formvalue:any) {
    this.filterData.emit(formvalue)
  }
}
