import { Component, ElementRef, ViewChild } from '@angular/core';
import { DistrictReportService } from '../../services/district-report.service';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { CommonService } from '../../../../../shared/services/common.service';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'district-report-list',
  templateUrl: './district-report-list.component.html',
  styleUrl: './district-report-list.component.scss'
})
export class DistrictReportListComponent {
  @ViewChild('TABLE', { static: false }) table: ElementRef | any;
  isLoading: boolean = false;
  columns: any;
  districtReportList: any;
  searchKeyword: any;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  selectFilter: any = {
    zone: 0,
    circle: 0,
    city: 0
  }
  isExporting: string = '';

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private districtService: DistrictReportService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.setInitialtable();
    this.getDistrictReport(this.pagesize.offset, this.pagesize.limit)

  };

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Zone Name', title: 'Zone' },
      { key: 'Circle Name', title: 'Circle' },
      { key: 'City Name', title: 'City' },
      { key: 'Division Name', title: 'Division' },
    ];
  }

  confirm(event: any) {
    this.selectFilter = {
      zone: 0,
      circle: 0,
      city: 0
    }
    let zone = Array.isArray(event.zone) && event.zone.length === 0
      ? 0
      : Number(event.zone?.value || 0);

    let circle = Array.isArray(event.circle) && event.circle.length === 0
      ? 0
      : Number(event.circle?.value || 0);

    let city = Array.isArray(event.city) && event.city.length === 0
      ? 0
      : Number(event.city?.value || 0);
    this.selectFilter = {
      zone: zone,
      circle: circle,
      city: city
    }
    this.getDistrictReport(this.pagesize.offset, this.pagesize.limit)
  }

  getDistrictReport(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.districtService.districtReport(page, this.selectFilter).subscribe((res: any) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      this.districtReportList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getDistrictReport(this.pagesize.offset, this.pagesize.limit);
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getDistrictReport(this.pagesize.offset, this.pagesize.limit);
  };


  getFullDivisionReport(callback: (data: any[]) => void): void {
    const page = {
      pageNo: 1,
      pageSize: 5000,
    };

    this.districtService.districtReport(page, this.selectFilter).subscribe({
      next: (res: any) => {
        const result = res?.body?.result || [];
        callback(result);
      },
      error: (err) => {
        console.error('Error fetching division report:', err);
        callback([]);
      },
    });
  }

  copyTable() {
    this.isExporting = 'Copy';
    this.getFullDivisionReport((data) => {
      const rows = data.map((item: any, index: number) => {
        return [
          (index + 1).toString(),
          item.zone_name || 'NA',
          item.circle_name || 'NA',
          item.district_name || 'NA',
          item.division_name || 'NA',
        ].join('\t');
      });

      this.commonService.copyTable(this.columns, rows);
      this.isExporting = '';
    });
  }

  exportToCSV() {
    this.isExporting = 'CSV'; 
    this.getFullDivisionReport((data) => {
      const rows = data.map((item, index) => `${(index + 1)},${item.zone_name},${item.circle_name},${item.district_name},${item.division_name.split(',').join(' ')}`)
      this.commonService.exportToCSV(this.columns, rows, 'district-report.csv');
      this.isExporting = ''; 
    });
  }

  exportToExcel() {
    this.isExporting = 'Excel';
    this.getFullDivisionReport((data) => {
      const rows = data.map((item, index) => {        
          return {
            'S NO': index + 1,
            'Zone': item?.zone_name,
            'Circle': item?.circle_name,
            'City': item?.district_name,
            'Division': item?.division_name,
          };        
      })
      this.commonService.excelService(rows, 'Division Report');
      this.isExporting = '';
    });
  }

  exportToPDF() {
    this.isExporting = 'PDF'; 
    this.getFullDivisionReport((data) => {
      const headers = ['S NO', 'Zone', 'Circle', 'City', 'Division'];
      const rows = data.map((item, index) => [
        (this.pagesize.offset - 1) * this.pagesize.limit + index + 1,
        item?.zone_name || 'NA',
        item?.circle_name || 'NA',
        item?.district_name || 'NA',
        item?.division_name || 'NA',
      ]);

      this.commonService.exportToPDF(headers, rows, 'Division Report');
      this.isExporting = '';
    })
  }
}
