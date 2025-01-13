import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CircleService } from '../../service/circle.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-circle',
  templateUrl: './create-circle.component.html',
  styleUrl: './create-circle.component.scss'
})
export class CreateCircleComponent {
    @Output() mapdata = new EventEmitter()
  
  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };

  editData: any;
  circleForm!: FormGroup;
  zoneList:any;
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  label : string = 'Create'

  constructor(
    private fb: FormBuilder,
    private bsModelService : BsModalService,
    private commonService : CommonService,
    private circleService : CircleService,
    private notificationSerivce : NotificationService,
    
  ) { };

  ngOnInit() { 
    this.setInitialvalue();
    this.getZoneList()
  }

  setInitialvalue() {
    if (this.editData) {
      this.label = 'Update'
      this.circleForm = this.fb.group({
        name: [this.editData?.circle_name, [Validators.required]],
        zone: [null, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]],
      });
    } else {
      this.circleForm = this.fb.group({
        name: ['', [Validators.required]],
        zone: [null, [Validators.required]],
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
        this.circleForm.controls['zone'].setValue(selectCompany);
      }
    });
  }

  close(){
    this.bsModelService.hide()
  }

  submit(formvalue:any) {
    if (this.circleForm.invalid) {
      this.circleForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();
    let payload = {
      "circle_id": 0,
      "circle_name": formvalue?.name,
      "zone_id": formvalue?.zone ? Number(formvalue?.zone?.value) : null,
      "zone_name": formvalue?.zone ? formvalue?.zone?.text : null,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
    };
    let service = this.circleService.createCircle(payload)

    if(this.editData?.circle_id) {
      payload['circle_id'] = this.editData?.circle_id;
      service = this.circleService.updateCircle(payload, this.editData?.circle_id)
    } 

    service.subscribe((res:any) => {
      if(res?.status == 200) {
        this.bsModelService.hide();
        this.mapdata.emit();
        this.notificationSerivce.successAlert(res?.body?.actionResponse);
      } else {
        this.notificationSerivce.errorAlert(res?.title);
      }
      
    })
  }
}
