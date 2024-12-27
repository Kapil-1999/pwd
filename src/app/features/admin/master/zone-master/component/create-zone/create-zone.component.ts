import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '../../services/zone.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-zone',
  templateUrl: './create-zone.component.html',
  styleUrls: ['./create-zone.component.scss']
})
export class CreateZoneComponent {
  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };
  stateList: any = [];
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  zoneForm!: FormGroup;
  editData:any

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private zoneService : ZoneService,
    private notificationSerivce : NotificationService,
    private bsModelService : BsModalService
  ) {}

  ngOnInit() {
    this.setInitialvalue();
    this.getStateList();        
  }

  getStateList() {
    this.commonService.stateList().subscribe((res) => {
      this.stateList = res?.body?.result;

      if (this.editData && this.editData?.state_id) {
        const selectCompany = this.stateList.find(
          (ele: any) => ele.value == this.editData?.state_id
        );
        this.zoneForm.controls['state'].setValue(selectCompany);
      }
    });
  }

  setInitialvalue() {
    if(this.editData) {
      this.zoneForm = this.fb.group({
        name: [this.editData?.zone_name, [Validators.required]],
        state: [null, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]],
      });
    } else {

      this.zoneForm = this.fb.group({
        name: ['', [Validators.required]],
        state: [null, [Validators.required]],
        status: [1, [Validators.required]],
      });
    }
  }

  submit(formvalue:any) {
    let payload = {
      "zone_id": 0,
      "zone_name": formvalue?.name,
      "state_id": formvalue?.state,
      "is_active": formvalue?.status,
      "created_by": 1
    };
    let service = this.zoneService.createZone(payload)

    if(this.editData?.zone_id) {
      payload['zone_id'] = this.editData?.zone_id;
      service = this.zoneService.updateZone(payload, this.editData?.zone_id)
    } 

    service.subscribe((res:any) => {
      if(res?.status == 200) {
        this.notificationSerivce.successAlert(res?.body?.actionResponse);
        this.bsModelService.hide()
      } else {
        this.notificationSerivce.errorAlert(res?.title);
      }
      
    })
  }

  close(){
    this.bsModelService.hide()
  }
}
