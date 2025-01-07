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

  formCodeList = [
    { id: 1, value: "01" },
    { id: 2, value: "02" },
    { id: 3, value: "03" },
    { id: 4, value: "04" },
    { id: 5, value: "05" },
    { id: 6, value: "06" },
    { id: 7, value: "07" },
    { id: 8, value: "08" },
    { id: 9, value: "09" },
    { id: 10, value: "10" },
    { id: 11, value: "11" },
    { id: 12, value: "12" },
    { id: 13, value: "13" },
    { id: 14, value: "14" },
    { id: 15, value: "15" },
    { id: 16, value: "16" },

  ]
  selectedSub: any;
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
          let catevalue = this.categoryList.find((val:any) => val?.category_id == this.selectedSub?.category_id)
          this.subcateForm.controls['catId'].setValue(catevalue)
        }
      }
    );
  }

  setInintivalue() {
    this.subcateForm = this.fb.group({
      catId: [null, [Validators.required]],
      subcateName: ['', [Validators.required]],
      formCode : [1, [Validators.required]],
      status: [1, [Validators.required]]
    })
    if(this.editData) {
      this.label = 'Update'
      this.getSubBasedOnId(this.editData?.sub_category_id);
    } else {
      this.getCateGory()
    }
  }

  getSubBasedOnId(id:any) {
    this.SubcategoryService.getsubCatById(id).subscribe((res:any) => {
     this.selectedSub = res?.body?.result
     this.subcateForm.patchValue({
      subcateName:this.selectedSub?.sub_category_name,
      formCode : this.selectedSub?.form_code,
      status: this.editData?.is_active
    })
    this.getCateGory()
    })
  }

  submit(formvalue: any) {
    let payload = {
      "sub_category_id": 0,
      "sub_category_name": formvalue?.subcateName,
      "category_id": formvalue?.catId?.category_id,
      "category_name": formvalue?.catId?.category_name,
      "form_code": formvalue?.formCode,
      "is_active": formvalue?.status,
      "created_by": 0
    }    
    let service = this.SubcategoryService.createsubCategory(payload);
    if(this.editData) {
      payload['sub_category_id'] = this.editData?.sub_category_id;
      service = this.SubcategoryService.updateSubCategory(payload, this.editData?.sub_category_id)
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
