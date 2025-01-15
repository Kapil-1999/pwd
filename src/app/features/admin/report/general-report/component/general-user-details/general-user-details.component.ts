import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-general-user-details',
  templateUrl: './general-user-details.component.html',
  styleUrl: './general-user-details.component.scss'
})
export class GeneralUserDetailsComponent {
  columns: any;
  searchKeyword:any;
  generalUserList :any
  constructor(
    private bsmoodalService: BsModalService
  ){}

  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Name', title: 'Name' },
      { key: 'Start Address (longitude/latitude)', title: 'Start Address (longitude/latitude)' },
      { key: 'Start Time', title: 'Start Time' },
      { key: 'End Address (longitude/latitude)', title: 'End Address (longitude/latitude)' },
      { key: 'Distance', title: 'Distance' },
      { key: 'Working Hours', title: 'Working Hours' }
    ];
  }

  cancel() {
    this.bsmoodalService.hide()
  }
}
