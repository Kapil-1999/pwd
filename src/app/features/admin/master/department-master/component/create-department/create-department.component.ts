import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.scss'
})
export class CreateDepartmentComponent {
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
  editData:any;
  label :string = 'Create'

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private departmentService : DepartmentService,
    private notificationSerivce : NotificationService,
    private bsModelService : BsModalService
  ) {}

  ngOnInit() {
    this.setInitialvalue()
  }

  setInitialvalue() {
    if(this.editData) {
      this.label = 'Update'      
      this.departmentForm = this.fb.group({
        name: [this.editData?.department_name, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]],
        remark : [this.editData?.department_desc]
      });
    } else {
      this.departmentForm = this.fb.group({
        name: ['', [Validators.required]],
        status: [1, [Validators.required]],
        remark : ['']

      });

    }
  }

  submit(formvalue:any) {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails()
    let payload = {
      "department_id": 0,
      "department_name": formvalue?.name,
      "department_desc": formvalue?.remark,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
    };
    let service = this.departmentService.createDepartment(payload)

    if(this.editData?.department_id) {
      payload['department_id'] = this.editData?.department_id;
      service = this.departmentService.updatedepartment(payload, this.editData?.department_id)
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

  close(){
    this.bsModelService.hide()
  }
}
