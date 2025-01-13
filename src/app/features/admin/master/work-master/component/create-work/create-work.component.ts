import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkService } from '../../services/work.service';

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  styleUrl: './create-work.component.scss'
})
export class CreateWorkComponent {
  @Output() mapdata = new EventEmitter()
  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };
  natureWoekList: any = [];
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  workForm!: FormGroup;
  editData: any;
  label: string = 'Create'

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private workService: WorkService,
    private notificationSerivce: NotificationService,
    private bsModelService: BsModalService
  ) { }

  ngOnInit() {
    console.log(this.editData);
    
    this.setInitialvalue();
  }

  getNatureWorkList() {
    this.workService.natureWorkList().subscribe((res) => {
      this.natureWoekList = res?.body?.result;
      if (this.editData && this.editData?.work_id) {
        const selectCompany = this.natureWoekList.find(
          (ele: any) => ele.value == this.editData?.nowtype_id
        );
        this.workForm.controls['nof'].setValue(selectCompany);
      }
    });
  }

  setInitialvalue() {
    if (this.editData) {
      this.getNatureWorkList();
      this.label = 'Update'
      this.workForm = this.fb.group({
        nof: [null, [Validators.required]],
        workId : [this.editData?.work_unique_code, Validators.required],
        mobile: [this.editData?.mobile_no],
        roadId: [this.editData?.road_id],
        status: [this.editData?.is_active, [Validators.required]],
      });
    } else {
      this.workForm = this.fb.group({
        nof: [null, [Validators.required]],
        workId : ['', Validators.required],
        mobile: [''],
        roadId: [''],
        status: [1, [Validators.required]],
      });
      this.getNatureWorkList();

    }
  }

  submit(formvalue: any) {
    if (this.workForm.invalid) {
      this.workForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails()
    let payload = {
      "work_id": 0,
      "work_unique_code": formvalue.workId,
      "mobile_no": formvalue.mobile,
      "road_id": formvalue.roadId,
      "nowtype_id": formvalue?.nof ? Number(formvalue?.nof?.value) : null,
      "nowtype_name": formvalue?.nof ? formvalue?.nof?.text : null,
      "is_active": formvalue?.status,
      "created_by": user.user_id
    };

    let service = this.workService.addWork(payload)

    if (this.editData?.work_id) {
      payload['work_id'] = this.editData?.work_id;
      service = this.workService.updateWork(payload, this.editData?.work_id)
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
