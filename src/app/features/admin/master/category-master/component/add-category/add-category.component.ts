import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CategoryService } from '../../services/category.service';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  @Output() mapdata = new EventEmitter()

  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  label: string = 'Add';
  cateForm!: FormGroup;
  editData: any;

  constructor(
    private bsModelService: BsModalService,
    private fb: FormBuilder,
    private notificationSerivce: NotificationService,
    private categoryService: CategoryService,
    private commonService : CommonService

  ) { };

  ngOnInit() {
    this.setInitialValue()
  }
  setInitialValue() {
    if(this.editData) {
      this.label = 'Update'
      this.cateForm = this.fb.group({
        name: [this.editData?.category_name, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]]
      })
    } else {
      this.cateForm = this.fb.group({
        name: ['', [Validators.required]],
        status: [1, [Validators.required]]
      })
    }
  }

  submit(formvalue: any) {
    if (this.cateForm.invalid) {
      this.cateForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();
    let payload = {
      "category_id": 0,
      "category_name": formvalue?.name,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
    }

    let service = this.categoryService.createCategory(payload);

    if(this.editData) {
      payload['category_id'] = this.editData?.category_id;
      service = this.categoryService.updateCategory(payload, this.editData?.category_id)
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
