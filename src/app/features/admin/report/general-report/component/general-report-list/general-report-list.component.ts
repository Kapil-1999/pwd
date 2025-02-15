import { Component } from '@angular/core';

@Component({
  selector: 'app-general-report-list',
  templateUrl: './general-report-list.component.html',
  styleUrl: './general-report-list.component.scss'
})
export class GeneralReportListComponent {
  isLoading : boolean = false;
  generalReportList: any;
  columns: any;
  searchKeyword:any;

  ngOnInit() {
    this.setInitialtable()
  };

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
}
