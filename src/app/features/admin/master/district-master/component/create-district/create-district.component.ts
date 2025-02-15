import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { circle } from 'leaflet';
import { DistrictService } from '../../services/district.service';

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
  circleList: any;
  label : string = 'Create'

  constructor(
    private bsModelService: BsModalService,
    private commonService: CommonService,
    private notificationSerivce: NotificationService,
    private fb: FormBuilder,
    private districtService : DistrictService

  ) { }

  ngOnInit() {
    this.setInitialvalue()
    this.getZoneList();
  }

  setInitialvalue() {
    if (this.editData) {
      this.label = 'Update';
      this.districtForm = this.fb.group({
        name: [this.editData?.district_name, [Validators.required]],
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
      if (this.editData && this.editData?.zone_id) {
        const selectCompany = this.zoneList.find(
          (ele: any) => ele.value == this.editData?.zone_id
        );
        this.districtForm.controls['zone'].setValue(selectCompany);
        this.getCircleList(selectCompany.value)
      }
    });
  }

  getCircleList(id: any) {
    this.commonService.circleList(id).subscribe((res) => {
      this.circleList = res?.body?.result;
      if (this.editData && this.editData?.circle_id) {
        const selectCompany = this.circleList.find(
          (ele: any) => ele.value == this.editData?.circle_id
        );
        this.districtForm.controls['circle'].setValue(selectCompany);
      }
    });
  }

  onChangeZone(event: any) {
    if (event?.value?.value) {
      this.getCircleList(event.value.value)
    } else {
      this.circleList = [];
    }
  }

  submit(formvalue: any) {
    if (this.districtForm.invalid) {
      this.districtForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();
    let payload = {
      "district_id": 0,
      "district_name": formvalue?.name,
      "circle_id": formvalue?.circle ? Number(formvalue.circle.value) : null,
      "is_active": formvalue?.status,
      "created_by": user?.user_id,
      "zone_id": formvalue?.zone ? Number(formvalue.zone.value) : null,
      "zone_name": formvalue?.zone ? formvalue.zone.text : null,
      "circle_name": formvalue?.circle ? (formvalue.circle.text) : null,
    }

    let service = this.districtService.createDistrict(payload);
    if(this.editData) {
      payload['district_id'] = this.editData?.district_id
      service = this.districtService.updateDistrict(this.editData?.district_id, payload)
    }

    service.subscribe((res) => {
      if(res?.status == 200) {
        this.bsModelService.hide();
        this.mapdata.emit();
        this.notificationSerivce.successAlert(res?.body?.actionResponse);
      } else {
        this.notificationSerivce.errorAlert(res?.title);
      }      
    })
  }

  close() {
    this.bsModelService.hide();
  }
}
