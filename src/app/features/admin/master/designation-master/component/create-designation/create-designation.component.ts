import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DesignationService } from '../../services/designation.service';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrl: './create-designation.component.scss'
})
export class CreateDesignationComponent {
  @Output() mapdata = new EventEmitter()
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
  departmentForm!: FormGroup;
  editData: any;
  label: string = 'Create'

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private DesignationService: DesignationService,
    private notificationSerivce: NotificationService,
    private bsModelService: BsModalService
  ) { }

  ngOnInit() {
    this.setInitialvalue();
  }

  setInitialvalue() {
    if (this.editData) {
      this.label = 'Update';
      this.departmentForm = this.fb.group({
        name: [this.editData?.designation_name, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]],
        remark: [this.editData?.designation_desc]
      });
    } else {
      this.departmentForm = this.fb.group({
        name: ['', [Validators.required]],
        status: [1, [Validators.required]],
        remark: ['']
      });
    }
  }

  submit(formvalue: any) {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();
    let payload = {
      "designation_id": 0,
      "designation_name": formvalue?.name,
      "designation_desc": formvalue?.remark,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
    };
    let service = this.DesignationService.createDesigantion(payload);
    if (this.editData?.designation_id) {
      payload['designation_id'] = this.editData?.designation_id;
      service = this.DesignationService.updateDesigantion(payload, this.editData?.designation_id)
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
    this.bsModelService.hide()
  }
}
