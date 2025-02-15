import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DivisionService } from '../../service/division.service';
import { NotificationService } from '../../../../../shared/services/notification.service';


@Component({
  selector: 'app-create-division',
  templateUrl: './create-division.component.html',
  styleUrl: './create-division.component.scss'
})
export class CreateDivisionComponent {
  @Output() mapdata = new EventEmitter()

  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  zoneList: any;
  circleList: any;
  cityList: any;
  divisionForm!: FormGroup;
  editData: any;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private bsModelService: BsModalService,
    private divisionService: DivisionService,
    private notificationSerivce: NotificationService
  ) { }

  ngOnInit() {
    this.setInitialValue();
    this.getZoneList();
  }

  setInitialValue() {
    console.log("chekc edit", this.editData);

    if (this.editData) {
      this.divisionForm = this.fb.group({
        divisionName: [this.editData?.division_name, [Validators.required]],
        zone: ['', [Validators.required]],
        circle: ['', [Validators.required]],
        city: ['', [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]]
      })
    } else {
      this.divisionForm = this.fb.group({
        divisionName: ['', [Validators.required]],
        zone: ['', [Validators.required]],
        circle: ['', [Validators.required]],
        city: ['', [Validators.required]],
        status: [1, [Validators.required]]
      })
    }
  }

  getZoneList() {
    this.commonService.zoneList(30).subscribe((res) => {
      this.zoneList = res?.body?.result || [];
      if (this.editData) {
        let selectedZone = this.zoneList.find((val: any) => this.editData?.zone_id == val.value);
        this.divisionForm.controls['zone'].patchValue(selectedZone);
        this.getCircleList(this.editData?.zone_id)
      } else {
        if (this.zoneList.length > 0) {
          this.divisionForm.controls['zone'].patchValue(this.zoneList[0]);
          this.getCircleList(this.zoneList[0].value)
        } else {
          this.zoneList = [];
          this.circleList = [];
          this.cityList = []
          this.divisionForm.controls['zone'].patchValue('');
          this.divisionForm.controls['circle'].patchValue('');
          this.divisionForm.controls['city'].patchValue('');
        }
      }
    })
  }

  onChangeZone(event: any) {
    if (event?.value?.value) {
      this.divisionForm.controls['circle'].patchValue('');
      this.getCircleList(event.value.value)
    } else {
      this.circleList = [];
      this.cityList = []
      this.divisionForm.controls['circle'].patchValue('');
      this.divisionForm.controls['city'].patchValue('');
    }
  }

  getCircleList(id: any) {
    this.commonService.circleList(id).subscribe((res) => {
      this.circleList = res?.body?.result;
      if (this.editData) {
        let selectedCircle = this.circleList.find((val: any) => this.editData?.circle_id == val.value);
        this.divisionForm.controls['circle'].patchValue(selectedCircle);
        this.getCityList(this.editData?.circle_id)
      } else {
        if (this.circleList.length > 0) {
          this.divisionForm.controls['circle'].patchValue(this.circleList[0]);
          this.getCityList(this.circleList[0].value)
        } else {
          this.circleList = [];
          this.cityList = []
          this.divisionForm.controls['circle'].patchValue('');
          this.divisionForm.controls['city'].patchValue('');
        }
      }
    });
  }

  onChangeCircle(event: any) {
    if (event?.value?.value) {
      this.getCityList(event.value.value);
    } else {
      this.cityList = []
      this.divisionForm.controls['city'].patchValue('');
    }
  }

  getCityList(id: any) {
    this.commonService.cityList(id).subscribe((res) => {
      this.cityList = res?.body?.result;
      this.divisionForm.controls['city'].patchValue(null);
      if (this.editData) {
        let selectedCity = this.cityList.find((val: any) => this.editData?.district_id == val.value);
        this.divisionForm.controls['city'].patchValue(selectedCity);
      }
    });
  }

  submit(formvalue: any) {
    if (this.divisionForm.invalid) {
      this.divisionForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();
    let payload = {
      "division_id": 0,
      "division_name": formvalue?.divisionName,
      "district_id": formvalue?.city ? Number(formvalue?.city?.value) : null,
      "is_active": formvalue?.status,
      "created_by": user?.user_id,
      "zone_id": formvalue?.zone ? Number(formvalue?.zone?.value) : null,
      "zone_name": formvalue?.zone ? formvalue?.zone?.text : null,
      "circle_id": formvalue?.circle ? Number(formvalue?.circle?.value) : null,
      "circle_name": formvalue?.circle ? formvalue?.circle?.text : null,
      "district_name": formvalue?.city ? formvalue?.city?.text : null,

    }
    let service = this.divisionService.createDivision(payload);
    if (this.editData) {
      payload['division_id'] = this.editData?.division_id;

      service = this.divisionService.updateDivision(payload, this.editData?.division_id);
    }
    service.subscribe((res: any) => {
      if (res?.status == 200) {
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
