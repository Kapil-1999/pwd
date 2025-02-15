import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { retry } from 'rxjs';
import { UserMasterService } from '../../services/user-master.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { IMG_URL } from '../../../../../shared/constant/menu/menu';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
    @Output() mapdata = new EventEmitter()
  
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
  divisionList: any;
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
  label: string = 'Create';
  imagePath: any;
  imgeUrl = IMG_URL;
  showPassword: boolean = false;


  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private bsModelService: BsModalService,
    private UserMasterService: UserMasterService,
    private notificationSerivce : NotificationService
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

    if (this.editData) {
      this.getChiefBasedOnId(this.editData?.user_id);
      this.label = 'Update';
    }
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
      }
    })
  }

  
  getImageUrl(path: string): string {
    return path ? `${this.imgeUrl}${path.replace(/\\/g, '/')}` : '';
  }


  getChiefEngList() {
    this.commonService.chiefEngList().subscribe({
      next: (res) => {
        this.chiefEngData = res?.body?.result || [];
        if (this.chiefEngData.length > 0 && this.chiefEngData.length === 1) {
          const chiefEngId = this.chiefEngData[0].value;
          this.userForm.controls['chiefEngineer'].setValue(this.chiefEngData[0]);
          if (this.designation?.value !== '3') {
            this.getSupritendingEngList(chiefEngId);
          } else {            
            this.getZoneBasedOnCE(chiefEngId)
          }
        } else {
          this.supritendingEngList = [];
          this.zoneList = [];
          this.userForm.controls['zone'].setValue(null);
          this.userForm.controls['chiefEngineer'].setValue(null);
          this.userForm.controls['supritendingEngineer'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Chief Engineer List:", err);
      }
    });
  }

  onChiefEngineerChange(event: any) {
    this.getZoneBasedOnCE(event.value.value);
    if (this.designation?.value === '3') return;
    if (event?.value?.value) {      
      this.getSupritendingEngList(event.value.value)
    } else {
      this.supritendingEngList = [];
      this.zoneList=[];
      this.userForm.controls['zone'].setValue(null);
      this.userForm.controls['supritendingEngineer'].setValue(null);

    }
  }

  getSupritendingEngList(chiefEngId: any) {
    this.commonService.supritendingEngList(chiefEngId).subscribe({
      next: (res) => {
        this.supritendingEngList = res?.body?.result || [];
        if (this.supritendingEngList.length > 0 && this.supritendingEngList.length === 1) {
          const supritendingEngId = this.supritendingEngList[0].value;
          this.userForm.controls['supritendingEngineer'].setValue(this.supritendingEngList[0]);
          if (this.designation?.value !== '4') {
            this.getExecutiveEngList(supritendingEngId);
          }
        } else {
          this.executiveEngList = [];
          this.assistantEngList = [];
          this.userForm.controls['supritendingEngineer'].setValue(null);
          this.userForm.controls['executiveEngineer'].setValue(null);
          this.userForm.controls['assistantEngineer'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Supritending Engineer List:", err);
      }
    });
  }

  onSupritendingEngineerChange(event: any) {
    if (this.designation?.value === '4') return;
    if (event?.value?.value) {
      this.getExecutiveEngList(event.value.value)
    } else {
      this.executiveEngList = [];
      this.assistantEngList = [];
      this.userForm.controls['executiveEngineer'].setValue(null);
      this.userForm.controls['assistantEngineer'].setValue(null);
    }
  }

  getExecutiveEngList(supritendingEngId: any) {
    this.commonService.executiveEngList(supritendingEngId).subscribe({
      next: (res) => {
        this.executiveEngList = res?.body?.result || [];
        if (this.executiveEngList.length > 0 && this.executiveEngList.length === 1) {
          const executiveEngId = this.executiveEngList[0].value;
          this.userForm.controls['executiveEngineer'].setValue(this.executiveEngList[0]);
          this.getAssistantEngList(executiveEngId);
        } else {
          this.assistantEngList = [];
          this.userForm.controls['executiveEngineer'].setValue(null);
          this.userForm.controls['assistantEngineer'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Executive Engineer List:", err);
      }
    });
  }

  onExecutiveEngineerChange(event: any) {
    if (event?.value?.value) {
      this.getAssistantEngList(event.value.value)
    } else {
      this.assistantEngList = [];
      this.userForm.controls['assistantEngineer'].setValue(null);
    }
  }

  getAssistantEngList(executiveEngId: any) {
    this.commonService.assistantEngList(executiveEngId).subscribe({
      next: (res) => {
        this.assistantEngList = res?.body?.result || [];
        if (this.assistantEngList.length > 0 && this.assistantEngList.length === 1) {
          this.userForm.controls['assistantEngineer'].setValue(this.assistantEngList[0]);
        } else {
          this.userForm.controls['assistantEngineer'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Assistant Engineer List:", err);
      }
    });
  }

  getZoneList() {
    this.commonService.zoneList(30).subscribe({
      next: (res) => {
        this.zoneList = res?.body?.result || [];
        if (this.zoneList.length > 0 && this.zoneList.length === 1) {
          this.userForm.controls['zone'].setValue(this.zoneList[0]);
        } else {
          this.userForm.controls['zone'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Zone List:", err);
      }
    });
  }

  onZoneChange(event: any) {
    if (this.designation?.value === '2') return;
    if (event?.value?.value) {
      this.getCircleList(event.value.value)
    } else {
      this.circleList = [];
      this.cityList = [];
      this.divisionData = [];
      this.userForm.controls['circle'].setValue(null);
      this.userForm.controls['city'].setValue(null);
      this.userForm.controls['division'].setValue(null);
    }
  }

  getCircleList(zoneId: any) {
    this.circleList=[];
    this.commonService.circleList(zoneId).subscribe({
      next: (res) => {
        this.circleList = res?.body?.result || [];
        if (this.circleList.length > 0 && this.circleList.length === 1) {
          const circleId = this.circleList[0].value;
          this.userForm.controls['circle'].setValue(this.circleList[0]);
          if (this.designation?.value !== '3') {
            this.getCityList(circleId);
          }
        } else {
          this.cityList = [];
          this.userForm.controls['circle'].setValue(null);
          this.userForm.controls['city'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Circle List:", err);
      }
    });
  }

  onCircleChange(event: any) {
    if (this.designation?.value === '3') return
    if (event?.value?.value) {
      this.getCityList(event.value.value)
    } else {
      this.cityList = [];
      this.divisionData = [];
      this.userForm.controls['city'].setValue(null);
      this.userForm.controls['division'].setValue(null);
    }
  }

  getCityList(circleId: any) {
    this.commonService.cityList(circleId).subscribe({
      next: (res) => {
        this.cityList = res?.body?.result || [];
        if (this.cityList.length > 0 && this.cityList.length === 1) {
          const cityId = this.cityList[0].value;
          this.userForm.controls['city'].setValue(this.cityList[0]);
          if (this.designation?.value !== '4') {
            this.getDivisionList(cityId);
          }
        } else {
          this.userForm.controls['city'].setValue(null);
          this.divisionData = [];
          this.userForm.controls['division'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching City List:", err);
      }
    });
  }

  onCityChange(event: any) {
    if (this.designation?.value === '4') return;
    if (event?.value?.value) {
      this.getDivisionList(event.value.value)
    } else {
      this.divisionData = [];
      this.userForm.controls['division'].setValue(null);
    }
  }

  getDivisionList(cityId: any) {
    this.commonService.divisionList(cityId).subscribe({
      next: (res) => {
        this.divisionData = res?.body?.result || [];
        if (this.divisionData.length > 0 && this.divisionData.length === 1) {
          this.userForm.controls['division'].setValue(this.divisionData[0]);
        } else {
          this.userForm.controls['division'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Division List:", err);
      }
    });
  }

  getSelectedValues(data: any) {
    console.log(data);

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
      if(res?.status == 200) {
        this.bsModelService.hide();
        this.mapdata.emit();
        this.notificationSerivce.successAlert(res?.body?.actionResponse);
      } else {
        this.notificationSerivce.errorAlert(res?.title);
      }
    })
  }

  getZoneBasedOnCE(id:any) {
    this.commonService.getZoneByChiefEng(id).subscribe({
      next: (res) => {
        this.zoneList = res?.body?.result || [];
        if (this.zoneList.length > 0 && this.zoneList.length === 1) {
          const zoneId = this.zoneList[0].value;
          this.userForm.controls['zone'].setValue(this.zoneList[0]);
          this.getCircleList(zoneId);
        } else {
          this.circleList = [];
          this.userForm.controls['zone'].setValue(null);
          this.userForm.controls['circle'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Zone List:", err);
      }
      
    })
  }


  getCircleBasedOnSE(zoneId: any) {
    this.commonService.getCircleBySupEng(zoneId).subscribe({
      next: (res) => {
        this.circleList = res?.body?.result || [];
        if (this.circleList.length > 0 && this.circleList.length === 1) {
          const circleId = this.circleList[0].value;
          this.userForm.controls['circle'].setValue(this.circleList[0]);
          this.getCityList(circleId);
        } else {
          this.cityList = [];
          this.divisionData = [];
          this.userForm.controls['circle'].setValue(null);
          this.userForm.controls['city'].setValue(null);
          this.userForm.controls['division'].setValue(null);
        }
      },
      error: (err) => {
        console.error("Error fetching Circle List:", err);
      }
    });
  }



}
