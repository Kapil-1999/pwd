import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../../category-master/services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CommonService } from '../../../../../shared/services/common.service';

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
  config1 = {
    displayKey: "text",
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

  formCodeList :any
  selectedSub: any;
  constructor(
    private bsModelService: BsModalService,
    private fb: FormBuilder,
    private CategoryService: CategoryService,
    private SubcategoryService: SubcategoryService,
    private notificationSerivce : NotificationService,
    private commonService : CommonService

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
      formCode : ['', [Validators.required]],
      status: [1, [Validators.required]]
    })
    if(this.editData) {
      this.label = 'Update'
      this.getSubBasedOnId(this.editData?.sub_category_id);
    } else {
      this.getCateGory();
      this.getFormCodeList()
    }
  }

  getSubBasedOnId(id:any) {
    this.SubcategoryService.getsubCatById(id).subscribe((res:any) => {
     this.selectedSub = res?.body?.result;
     this.subcateForm.patchValue({
      subcateName:this.selectedSub?.sub_category_name,
      status: this.editData?.is_active
    })
    this.getCateGory();
    this.getFormCodeList()
    })
  }

  getFormCodeList() {
    this.SubcategoryService.formCodeList().subscribe((res:any) => {
      this.formCodeList = res?.body?.result;
      console.log(this.formCodeList);      
      if(this.selectedSub) {
        let selectedForm = this.formCodeList?.find((val:any) => val?.value == this.selectedSub?.form_code)        
        this.subcateForm.controls['formCode'].setValue(selectedForm)
      }
    })
  }

  submit(formvalue: any) {    
    if (this.subcateForm.invalid) {
      this.subcateForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();

    let payload = {
      "sub_category_id": 0,
      "sub_category_name": formvalue?.subcateName,
      "category_id": formvalue?.catId?.category_id,
      "category_name": formvalue?.catId?.category_name,
      "form_code": formvalue?.formCode ? Number(formvalue?.formCode?.value) : null,
      "form_code_text":formvalue?.formCode ? formvalue?.formCode?.text : null,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
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
