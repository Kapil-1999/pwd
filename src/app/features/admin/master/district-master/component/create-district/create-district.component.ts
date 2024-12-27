import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { circle } from 'leaflet';

@Component({
  selector: 'app-create-district',
  templateUrl: './create-district.component.html',
  styleUrl: './create-district.component.scss'
})
export class CreateDistrictComponent {
  districtForm!: FormGroup;
  @Output() mapdata = new EventEmitter()

  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };

  editData: any;
  zoneList: any;
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  circleList: any

  constructor(
    private bsModelService: BsModalService,
    private commonService: CommonService,
    private notificationSerivce: NotificationService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.setInitialvalue()
    this.getZoneList()
  }

  setInitialvalue() {
    if (this.editData) {
      this.districtForm = this.fb.group({
        name: [this.editData?.circle_name, [Validators.required]],
        zone: [null, [Validators.required]],
        circle: [null, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]],
      });
    } else {
      this.districtForm = this.fb.group({
        name: ['', [Validators.required]],
        zone: [null, [Validators.required]],
        circle: [null, [Validators.required]],
        status: [1, [Validators.required]],
      });
    }
  }

  getZoneList() {
    this.commonService.zoneList(30).subscribe((res) => {
      this.zoneList = res?.body?.result;
      this.districtForm.controls['zone'].setValue(this.zoneList[0]);
      this.getCircleList(this.zoneList[0].value)
    });
  }

  getCircleList(id: any) {
    this.commonService.circleList(id).subscribe((res) => {
      this.circleList = res?.body?.result;
    });
  }

  onChangeZone(event: any) {
    if (event.value.value) {
      this.getCircleList(event.value.value)
    } else {
      this.circleList = [];
    }
  }

  submit(formvalue: any) {
    console.log("check", formvalue);
    
  }

  close() {

  }
}
