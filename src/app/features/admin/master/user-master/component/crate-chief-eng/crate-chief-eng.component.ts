import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { retry } from 'rxjs';
import { UserMasterService } from '../../services/user-master.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { IMG_URL } from '../../../../../shared/constant/menu/menu';
@Component({
  selector: 'app-crate-chief-eng',
  templateUrl: './crate-chief-eng.component.html',
  styleUrl: './crate-chief-eng.component.scss'
})
export class CrateChiefEngComponent {
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
  deparmentList: any;
  editData: any;
  imgeUrl = IMG_URL;

  userForm!: FormGroup;
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  divisionData: any;
  userData: any;
  label :string = 'Create';
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
      this.getZoneList();
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

        this.getZoneList();
      }
    })
  }

  getImageUrl(path: string): string {
    return path ? `${this.imgeUrl}${path.replace(/\\/g, '/')}` : '';
  }

  getZoneList() {
    this.commonService.zoneList(30).subscribe((res) => {
      this.zoneList = res?.body?.result || [];
      if (this.userData) {
        let zoneValue = this.userData?.zone;
        if (zoneValue) {
          let matchingCE;
          if (zoneValue.includes(",")) {
            let formatValue = zoneValue.split(",").map((val:any) => val.trim());
            matchingCE = this.zoneList.filter((zone: any) =>
              formatValue.includes(zone?.value.toString())
            );
          } else {
            matchingCE = this.zoneList.find((zone: any) =>
              zone?.value.toString() === zoneValue.toString()
            );
          }
          this.userForm.controls['zone'].setValue(matchingCE || null);
        }
      } else if (this.zoneList.length > 0 && this.zoneList.length === 1) {
        this.userForm.controls['zone'].setValue(this.zoneList[0]);
      } else {
        this.userForm.controls['zone'].setValue(null);
      }
    })
  }


  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return data?.value;
    }

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




}
