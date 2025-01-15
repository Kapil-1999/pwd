import { Component } from '@angular/core';

@Component({
  selector: 'district-report-list',
  templateUrl: './district-report-list.component.html',
  styleUrl: './district-report-list.component.scss'
})
export class DistrictReportListComponent {
  isLoading: boolean = false;
  columns: any;
  districtReportList: any;
  searchKeyword: any;

  ngOnInit() {
    this.setInitialtable()
  };

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Zone Name', title: 'Zone Name' },
      { key: 'Circle Name', title: 'Circle Name' },
      { key: 'City Name', title: 'City Name' },
      { key: 'Division Name', title: 'Division Name' },
    ];
  }
}
