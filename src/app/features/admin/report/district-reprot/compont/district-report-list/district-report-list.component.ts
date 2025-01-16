import { Component } from '@angular/core';
import { DistrictReportService } from '../../services/district-report.service';

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
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  selectFilter:any = {
    zone: 0,
    circle: 0,
    city: 0
  }

  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private districtService : DistrictReportService
  ) {}

  ngOnInit() {
    this.setInitialtable();
    this.getDistrictReport(this.pagesize.offset, this.pagesize.limit)

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
    this.districtService.districtReport(page, this.selectFilter).subscribe((res:any) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      this.districtReportList = res?.body?.result  || [];
      this.pagesize.count =  res?.body?.totalRow;
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

  }
}
