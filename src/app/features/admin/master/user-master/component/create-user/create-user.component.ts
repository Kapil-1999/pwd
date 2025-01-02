import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select`,
  };
  deparmentList: any;
  desigantionList: any;
  department:any;
  designation:any
  chiefEngData: any;
  userForm!: FormGroup;
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];

  
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.initializeForm()
    this.getChiefEngList()
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      chiefEngineer: [null, Validators.required],
      zone: [null, Validators.required],
      supritendingEngineer: [null, Validators.required],
      circle: [null, Validators.required],
      executiveEngineer: [null, Validators.required],
      city: [null, Validators.required],
      assistantEngineer: [null, Validators.required],
      division: [null, Validators.required],
      name: ['', [Validators.required]],
      contactNo: ['', [Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.email]],
      address: [''],
      loginId: ['', Validators.required],
      loginPassword: ['', Validators.required],
      remarks: [''],
      status: [1, Validators.required],
      photo: [null]
    });
  }

  getChiefEngList () {
    this.commonService.chiefEngList().subscribe((res) => {
      console.log("check res", this.chiefEngData);
      
    })
  }



}
