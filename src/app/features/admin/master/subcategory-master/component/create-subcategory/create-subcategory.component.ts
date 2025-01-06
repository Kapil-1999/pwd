import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../../category-master/services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrl: './create-subcategory.component.scss'
})
export class CreateSubcategoryComponent {
  @Output() mapdata = new EventEmitter()

  subcateForm!: FormGroup;
  config = {
    displayKey: "category_name",
    search: true,
    height: '300px'
  };
  categoryList: any;
  editData: any;
  label: string = 'Create'
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  constructor(
    private bsModelService: BsModalService,
    private fb: FormBuilder,
    private CategoryService: CategoryService,
    private SubcategoryService: SubcategoryService,
    private notificationSerivce : NotificationService

  ) { }

  ngOnInit() {
    this.setInintivalue();
  }

  getCateGory() {
    const page = {
      pageNo: 1,
      pageSize: 5000,
    };
    this.CategoryService.categoryList(page).subscribe(
      (data) => {
        this.categoryList = data?.body?.result;
        if(this.editData) {
          let catevalue = this.categoryList.find((val:any) => val?.category_id == this.editData?.category_id)
          this.subcateForm.controls['catId'].setValue(catevalue)
        }
      }
    );
  }

  setInintivalue() {
    if(this.editData) {
      this.label = 'Update'
      this.subcateForm = this.fb.group({
        catId: [null, [Validators.required]],
        subcateName: [this.editData?.sub_category_name, [Validators.required]],
        status: [this.editData?.is_active, [Validators.required]]
      })
      this.getCateGory()
    } else {
      this.subcateForm = this.fb.group({
        catId: [null, [Validators.required]],
        subcateName: ['', [Validators.required]],
        status: [1, [Validators.required]]
      })
      this.getCateGory()
    }
  }

  submit(formvalue: any) {
    let payload = {
      "sub_category_id": 0,
      "sub_category_name": formvalue?.subcateName,
      "category_id": formvalue?.catId?.category_id,
      "category_name": formvalue?.catId?.category_name,
      "form_code": 0,
      "is_active": formvalue?.status,
      "created_by": 0
    }    
    let service = this.SubcategoryService.createsubCategory(payload);
    if(this.editData) {
      payload['sub_category_id'] = this.editData?.sub_category_id;
      service = this.SubcategoryService.updateSubCategory(payload, this.editData?.sub_category_id)
    }

    service.subscribe((res: any) => {
      console.log(res);

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
