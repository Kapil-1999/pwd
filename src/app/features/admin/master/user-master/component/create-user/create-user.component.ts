import { Component } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  constructor(
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.getStateList()
  }

  getStateList () {
    this.commonService.stateList().subscribe((res) => {
      console.log("check res", res);
      
    })
  }


}
