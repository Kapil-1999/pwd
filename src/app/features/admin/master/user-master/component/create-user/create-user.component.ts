import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';

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
  constructor(
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.getStateList()
  }

  getStateList () {
    this.commonService.stateList().subscribe((res) => {
      console.log("check res", this.designation);
      
    })
  }



}
