import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { PoiAllocationService } from '../../services/poi-allocation.service';
import { AreaService } from '../../../../master/area-master/services/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'app-create-poi',
  templateUrl: './create-poi.component.html',
  styleUrl: './create-poi.component.scss'
})
export class CreatePoiComponent {
  @Output() mapdata = new EventEmitter()

  label: string = 'Create';
  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ]
  desigantionList: any;
  userList: any;
  areaData: any;
  poiForm!: FormGroup;
  editData:any;
  getPoiByIdData:any

  constructor(
    private bsmodalService: BsModalService,
    private commonservice: CommonService,
    private poiService: PoiAllocationService,
    private areaService: AreaService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private notificationService: NotificationService

  ) { }

  ngOnInit() {
    this.setInitialvalue()

  }

  setInitialvalue() {
    this.poiForm = this.fb.group({
      designation: [null, [Validators.required]],
      user: [null, [Validators.required]],
      date: ['', [Validators.required, this.dateValidator]],
      area: [null, [Validators.required]],
      status: [1, [Validators.required]],
      remark: ['']
    })

    if(this.editData) {
      this.getPoiById(this.editData?.poi_alloc_id)

    } else {
      this.getDesignationList();
      this.getAreaList()
    }
  }

  dateValidator(control: any) {
    if (!control.value) return { required: true };
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(control.value)) return { invalidDate: true };
    return null;
  }

  getPoiById(id:any){
    this.poiService.getAllocationById(id).subscribe((res:any) => {
      this.getPoiByIdData = res?.body?.result
      const dateTimeValue = this.getPoiByIdData?.allocated_date;
      const dateValue = dateTimeValue.split('T')[0];
      this.poiForm.patchValue({
        date : dateValue,
        status : this.getPoiByIdData?.is_active,
        remark : this.getPoiByIdData?.remarks
      })
      this.getDesignationList();
      this.getAreaList()
    })
  }

  getDesignationList() {
    this.commonservice.designationList().subscribe((res) => {
      this.desigantionList = res?.body?.result;
      if(this.getPoiByIdData) {
        let selectedDesi = this.desigantionList?.find((val:any) => val?.value == this.getPoiByIdData?.designation_id);        
        this.poiForm.controls['designation'].setValue(selectedDesi);
        this.getUserBydesignation(selectedDesi?.value)
      }
    });
  }

  onChangeDesi(event: any) {
    this.getUserBydesignation(event.value?.value)
  }

  getUserBydesignation(id: any) {
    this.poiService.getUserBudesi(id).subscribe((res: any) => {
      this.userList = res?.body?.result;
      if(this.getPoiByIdData) {
        let selectedDesi = this.userList.find((val:any) => val?.value == this.getPoiByIdData?.user_id);
        this.poiForm.controls['user'].setValue(selectedDesi)
      }
    })
  }

  getAreaList() {
    this.poiService.poiArea().subscribe((res: any) => {
      this.areaData = res?.body?.result || [];           
      let circleValue = this.getPoiByIdData?.area_id
      if (circleValue) {
        let matchingCE;
        if (circleValue.includes(",")) {
          let formatValue = circleValue.split(",").map((val: any) => val.trim());
          matchingCE = this.areaData.filter((zone: any) =>
            formatValue.includes(zone?.value.toString())
          );
        } else {
          matchingCE = this.areaData.find((zone: any) =>
            zone?.value.toString() === circleValue.toString()
          );
        }
        this.poiForm.controls['area'].setValue(matchingCE || null) 
      }
    });
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return { value: data?.value, text: data?.text };
    }
    return {
      value: data.map((item: any) => item.value).join(','),
      text: data.map((item: any) => item.text).join(',')
    };
  }

  submit(formvalue: any) {
    if (this.poiForm.invalid) {
      this.poiForm.markAllAsTouched();
      return;
    }
    let user = this.commonService.getUserDetails();
    let areaData = formvalue?.area ? this.getSelectedValues(formvalue?.area) : { value: null, text: null };
    let payload = {
      "poi_alloc_id": 0,
      "designation_id": formvalue?.designation ? Number(formvalue?.designation?.value) : null,
      "designation_name": formvalue?.designation ? formvalue?.designation?.text : null,
      "user_id": formvalue?.user ? Number(formvalue?.user?.value) : null,
      "user_name": formvalue?.user ? formvalue?.user?.text : null,
      "allocated_date": formvalue?.date,
      "area_id": areaData.value,
      "area_text": "",
      "remarks": formvalue?.remark,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
    }

    let service = this.poiService.addPOIAllocation(payload);
    if(this.getPoiByIdData) {
      payload['poi_alloc_id'] = this.getPoiByIdData?.poi_alloc_id
      service = this.poiService.updateAllocation(payload, this.getPoiByIdData?.poi_alloc_id)
    }
    service.subscribe((res: any) => {
      if (res?.status == 200) {
        this.bsmodalService.hide();
        this.mapdata.emit();
        this.notificationService.successAlert(res?.body?.actionResponse);
      } else {
        this.notificationService.errorAlert(res?.title);
      }
    })
  }


  close() {
    this.bsmodalService.hide()
  }
}
