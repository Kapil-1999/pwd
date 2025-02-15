import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { retry } from 'rxjs';
import { UserMasterService } from '../../services/user-master.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { IMG_URL } from '../../../../../shared/constant/menu/menu';

@Component({
  selector: 'app-crate-junior-eng',
  templateUrl: './crate-junior-eng.component.html',
  styleUrl: './crate-junior-eng.component.scss'
})
export class CrateJuniorEngComponent {
  @Output() mapdata = new EventEmitter();

  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select`,
    noResultsFound: '',
    selectAllLabel: 'Select all',
    enableSelectAll: true,
  };
  department: any;
  designationList: any;
  chiefEngData: any;
  zoneList: any;
  supritendingEngList: any;
  circleList: any;
  executiveEngList: any;
  cityList: any;
  assistantEngList: any;
  designation: any;
  desigantionList: any;
  deparmentList: any

  userForm!: FormGroup;
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  divisionData: any;
  userData: any;
  editData: any;
  label :string = 'Create';
  imgeUrl = IMG_URL;
  imagePath: any;
  showPassword: boolean = false;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private bsModelService: BsModalService,
    private UserMasterService: UserMasterService,
    private notificationSerivce: NotificationService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      chiefEngineer: [null],
      zone: [null],
      supritendingEngineer: [null],
      circle: [null],
      executiveEngineer: [null],
      city: [null],
      assistantEngineer: [null],
      division: [null],
      name: [null, [Validators.required]],
      contactNo: [null],
      email: [null],
      address: [null],
      loginId: [null, Validators.required],
      loginPassword: [null, Validators.required],
      remarks: [null],
      status: [1, Validators.required],
      photo: [null]
    });

    this.updateValidators();

    if (this.editData) {
      this.getChiefBasedOnId(this.editData?.user_id);
      this.label = 'Update';
    } else {
      this.getChiefEngList();
    }

  }

  updateValidators(): void {
    this.userForm.controls['chiefEngineer'].clearValidators();
    this.userForm.controls['supritendingEngineer'].clearValidators();
    this.userForm.controls['executiveEngineer'].clearValidators();
    this.userForm.controls['assistantEngineer'].clearValidators();
    this.userForm.controls['zone'].clearValidators();
    this.userForm.controls['circle'].clearValidators();
    this.userForm.controls['city'].clearValidators();
    this.userForm.controls['division'].clearValidators();


    this.userForm.get('contactNo')?.valueChanges.subscribe(value => {
      this.userForm.controls['contactNo'].setValidators([Validators.pattern(/^\d{10}$/)]);
    })

    this.userForm.get('email')?.valueChanges.subscribe(value => {
      this.userForm.controls['email'].setValidators([Validators.email]);
    })

    if (this.designation?.value === '2') {
      this.userForm.controls['zone'].setValidators(Validators.required);
    } else if (['3', '4', '5', '6'].includes(this.designation?.value)) {
      this.userForm.controls['chiefEngineer'].setValidators(Validators.required);
      this.userForm.controls['zone'].setValidators(Validators.required);
      this.userForm.controls['circle'].setValidators(Validators.required);
    }

    if (['4', '5', '6'].includes(this.designation?.value)) {
      this.userForm.controls['supritendingEngineer'].setValidators(Validators.required);
      this.userForm.controls['city'].setValidators(Validators.required);
    }

    if (['5', '6'].includes(this.designation?.value)) {
      this.userForm.controls['executiveEngineer'].setValidators(Validators.required);
      this.userForm.controls['division'].setValidators(Validators.required);
    }

    if (this.designation?.value === '6') {
      this.userForm.controls['assistantEngineer'].setValidators(Validators.required);
    }

    this.userForm.updateValueAndValidity();
  }

  getChiefBasedOnId(id: any) {
    this.UserMasterService.userById(id).subscribe((res: any) => {
      this.userData = res?.body?.result;
      if (this.userForm) {
        this.userForm.patchValue({
          name: this.userData?.full_name,
          contactNo: this.userData?.contact_no,
          email: this.userData?.email_id,
          address: this.userData?.cur_address,
          loginId: this.userData?.login_id,
          loginPassword: this.userData?.login_pass,
          remarks: this.userData?.remarks,
          status: this.userData?.is_active,
        });
        this.imagePath = this.userData?.img_path;

        this.getChiefEngList();
      }
    })
  }

  getImageUrl(path: string): string {
    return path ? `${this.imgeUrl}${path.replace(/\\/g, '/')}` : '';
  }


  getChiefEngList() {
    this.commonService.chiefEngList().subscribe((res:any) =>{
      this.chiefEngData = res?.body?.result || [];
      this.chiefEngData = res?.body?.result || [];
      if (this.userData) {
        let matchingCE = this.chiefEngData?.find((zone: any) => zone?.value == this.userData?.chief_eng_id);
        this.userForm.controls['chiefEngineer'].setValue(matchingCE);
        this.getZoneBasedOnCE(matchingCE?.value)
        this.getSupritendingEngList(matchingCE?.value);
      } else if(this.chiefEngData.length > 0 && this.chiefEngData.length === 1) {
        const chiefEngId = this.chiefEngData[0].value;
        this.userForm.controls['chiefEngineer'].setValue(this.chiefEngData[0]);
        this.getSupritendingEngList(chiefEngId);
        this.getZoneBasedOnCE(chiefEngId)
      } else {
        this.supritendingEngList = [];
        this.zoneList = [];
        this.executiveEngList = [];
        this.circleList = [];
        this.cityList = [];
        this.divisionData = []
        this.userForm.controls['zone'].setValue(null);
        this.userForm.controls['chiefEngineer'].setValue(null);
        this.userForm.controls['supritendingEngineer'].setValue(null);
        this.userForm.controls['executiveEngineer'].setValue(null);
        this.userForm.controls['circle'].setValue(null);
        this.userForm.controls['city'].setValue(null);
        this.userForm.controls['division'].setValue(null);

      }
    });
  }

  onChiefEngineerChange(event: any) {
    if (event?.value?.value) {
      this.getZoneBasedOnCE(event.value.value);
      this.getSupritendingEngList(event.value.value)
    } else {
      this.supritendingEngList = [];
      this.zoneList = [];
      this.executiveEngList = [];
      this.circleList = [];
      this.cityList = [];
      this.divisionData = [];
      this.userForm.controls['zone'].setValue(null);
      this.userForm.controls['supritendingEngineer'].setValue(null);
      this.userForm.controls['executiveEngineer'].setValue(null);
      this.userForm.controls['circle'].setValue(null);
      this.userForm.controls['city'].setValue(null);
      this.userForm.controls['division'].setValue(null);

    }
  }

  getSupritendingEngList(chiefEngId: any) {
    this.commonService.supritendingEngList(chiefEngId).subscribe((res:any) =>{
      this.supritendingEngList = res?.body?.result || [];

      if (this.userData) {
        let matichSe = this.supritendingEngList?.find((sup: any) => sup.value == this.userData?.sup_eng_id);
        this.userForm.controls['supritendingEngineer'].setValue(matichSe);
        this.getCircleBasedOnSE(matichSe.value);
        this.getExecutiveEngList(matichSe.value);
      } else if (this.supritendingEngList.length > 0 && this.supritendingEngList.length === 1) {
        const supritendingEngId = this.supritendingEngList[0].value;
        this.userForm.controls['supritendingEngineer'].setValue(this.supritendingEngList[0]);
        this.getExecutiveEngList(supritendingEngId);
        this.getCircleBasedOnSE(supritendingEngId)
      } else {
        this.executiveEngList = [];
        this.circleList = [];
        this.cityList = [];
        this.divisionData = [];
        this.userForm.controls['supritendingEngineer'].setValue(null);
        this.userForm.controls['executiveEngineer'].setValue(null);
        this.userForm.controls['circle'].setValue(null);
        this.userForm.controls['city'].setValue(null);
        this.userForm.controls['division'].setValue(null);

      }
    });
  }

  onSupritendingEngineerChange(event: any) {
    if (event?.value?.value) {
      this.getExecutiveEngList(event.value.value);
      this.getCircleBasedOnSE(event.value.value)
    } else {
      this.executiveEngList = [];
      this.circleList = [];
      this.cityList = [];
      this.divisionData = [];
      this.userForm.controls['executiveEngineer'].setValue(null);
      this.userForm.controls['circle'].setValue(null);
      this.userForm.controls['city'].setValue(null);
      this.userForm.controls['division'].setValue(null);
    }
  }

  getExecutiveEngList(supritendingEngId: any) {
    this.commonService.executiveEngList(supritendingEngId).subscribe((res:any) => {
      this.executiveEngList = res?.body?.result || [];
      if (this.userData) {
        let matichSe = this.executiveEngList?.find((sup: any) => sup.value == this.userData?.exec_eng_id);
        this.userForm.controls['executiveEngineer'].setValue(matichSe);
        this.getDistrictByExecEng(matichSe.value)
        this.getAssistantEngList(matichSe.value)
      } else if (this.executiveEngList.length > 0 && this.executiveEngList.length === 1) {
        const executiveEngId = this.executiveEngList[0].value;
        this.userForm.controls['executiveEngineer'].setValue(this.executiveEngList[0]);
        this.getDistrictByExecEng(executiveEngId);
        this.getAssistantEngList(executiveEngId)
      } else {
        this.cityList = [];
        this.divisionData = [];
        this.assistantEngList = [];
        this.userForm.controls['city'].setValue(null);
        this.userForm.controls['division'].setValue(null);
        this.userForm.controls['executiveEngineer'].setValue(null);
        this.userForm.controls['assistantEngineer'].setValue(null);
      }
    });
  }

  onExecutiveEngineerChange(event: any) {
    if (event?.value?.value) {
      this.getDistrictByExecEng(event.value.value)
      this.getAssistantEngList(event.value.value)
    } else {
      this.cityList = [];
      this.divisionData = [];
      this.assistantEngList = [];
      this.userForm.controls['city'].setValue(null);
      this.userForm.controls['division'].setValue(null);
      this.userForm.controls['assistantEngineer'].setValue(null);

    }
  }

  getAssistantEngList(executiveEngId: any) {
    this.commonService.assistantEngList(executiveEngId).subscribe((res:any) => {
      this.assistantEngList = res?.body?.result || [];
      if(this.userData) {
        let matichCircle = this.assistantEngList?.find((sup:any) => sup.value == this.userData?.ass_eng_id);
        this.userForm.controls['assistantEngineer'].setValue(matichCircle);
        this.getDivisionByAssEng(matichCircle.value);
      } else if (this.assistantEngList.length > 0 && this.assistantEngList.length === 1) {
        const assistantEngId = this.assistantEngList[0].value;
        this.userForm.controls['assistantEngineer'].setValue(this.assistantEngList[0]);
        this.getDivisionByAssEng(assistantEngId)
      } else {
        this.userForm.controls['assistantEngineer'].setValue(null);
      }
    });
  }

  onChangeAssitant(event:any) {
    if (event?.value?.value) {
      this.getDivisionByAssEng(event.value.value)
    }else {
      this.divisionData = [];
      this.userForm.controls['division'].setValue(null);
    }
  }


  getSelectedValues(data: any) {
    return data?.map((item: any) => item.value).join(',');
  }

  close() {
    this.bsModelService.hide();
  }

  photoBase64: string | null = null;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let imageValue = reader.result as string
        this.photoBase64 = imageValue.split(',')[1];
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        this.notificationSerivce.errorAlert("Failed to read file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  }

  submit(formvalue: any) {
    let user = this.commonService.getUserDetails()

    let paylaod = {
      "user_id": 0,
      "department_id": this.department ? Number(this.department?.value) : null,
      "emp_id": 0,
      "full_name": formvalue?.name,
      "contact_no": formvalue?.contactNo,
      "email_id": formvalue?.email,
      "cur_address": formvalue?.address,
      "login_id": formvalue?.loginId,
      "login_pass": formvalue?.loginPassword,
      "designation_id": this.designation ? Number(this.designation?.value) : null,
      "level_id": this.designation ? Number(this.designation?.value) : null,
      "chief_eng_id": formvalue?.chiefEngineer ? Number(formvalue?.chiefEngineer?.value) : null,
      "zone": this.designation?.value === '2'
        ? (formvalue?.zone ? this.getSelectedValues(formvalue.zone) : null)
        : (formvalue?.zone ? formvalue.zone.value : null),
      "sup_eng_id": formvalue?.supritendingEngineer ? Number(formvalue?.supritendingEngineer?.value) : null,
      "circle": this.designation?.value === '3'
        ? (formvalue?.circle ? this.getSelectedValues(formvalue?.circle) : null)
        : (formvalue?.circle ? formvalue?.circle.value : null),
      "exec_eng_id": formvalue?.executiveEngineer ? Number(formvalue?.executiveEngineer?.value) : null,
      "district": this.designation?.value === '4'
        ? (formvalue?.city ? this.getSelectedValues(formvalue?.city) : null)
        : (formvalue?.city ? formvalue?.city.value : null),
      "ass_eng_id": formvalue?.assistantEngineer ? Number(formvalue?.assistantEngineer?.value) : null,
      "division": this.designation?.value === '5'
        ? (formvalue?.division ? this.getSelectedValues(formvalue?.division) : null)
        : (formvalue?.division ? formvalue?.division.value : null),
      "remarks": formvalue?.remarks,
      "img_path": this.photoBase64,
      "is_active": formvalue?.status,
      "created_by": user?.user_id
    }

    let service = this.UserMasterService.createUser(paylaod);
    if (this.userData) {
      paylaod['user_id'] = this.userData?.user_id;
      service = this.UserMasterService.updateUser(paylaod, this.userData?.user_id)
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

  getZoneBasedOnCE(id: any) {
    this.commonService.getZoneByChiefEng(id).subscribe((res:any) =>{
      this.zoneList = res?.body?.result || [];
      if (this.userData) {
        let matichZone = this.zoneList?.find((sup:any) => sup.value == this.userData?.zone);
        this.userForm.controls['zone'].setValue(matichZone);
      } else if (this.zoneList.length > 0 && this.zoneList.length === 1) {
        this.userForm.controls['zone'].setValue(this.zoneList[0]);
      } else {
        this.userForm.controls['zone'].setValue(null);
      }      
    })
  }


  getCircleBasedOnSE(zoneId: any) {
    this.commonService.getCircleBySupEng(zoneId).subscribe((res:any)=>{
      this.circleList = res?.body?.result || [];
      if (this.userData) {
        let matichCircle = this.circleList?.find((sup:any) => sup.value == this.userData?.circle);
        this.userForm.controls['circle'].setValue(matichCircle);
      }else if (this.circleList.length > 0 && this.circleList.length === 1) {
        this.userForm.controls['circle'].setValue(this.circleList[0]);         
      } 
      
    });
  }

  getDistrictByExecEng(id:any) {
    this.commonService.getDistrictByExecEng(id).subscribe((res:any) =>{
      this.cityList = res?.body?.result || [];
      if(this.userData) {
        let matichCircle = this.cityList?.find((sup:any) => sup.value == this.userData?.district);
        this.userForm.controls['city'].setValue(matichCircle);
      } else if (this.cityList.length > 0 && this.cityList.length === 1) {
        this.userForm.controls['city'].setValue(this.cityList[0]);
      } else {
        this.userForm.controls['city'].setValue(null);
      }
    });
  }

  getDivisionByAssEng(id:any) {
    this.commonService.getDivisionByAssEng(id).subscribe((res:any) =>{
      this.divisionData = res?.body?.result || [];    
      if(this.userData) {
        let matichCircle = this.divisionData?.find((sup:any) => sup.value == this.userData?.division);
        this.userForm.controls['division'].setValue(matichCircle);
      } else if (this.divisionData.length > 0 && this.divisionData.length === 1) {
        this.userForm.controls['division'].setValue(this.divisionData[0]);
      } else {
        this.userForm.controls['division'].setValue(null);
      }
    });
  }



}
