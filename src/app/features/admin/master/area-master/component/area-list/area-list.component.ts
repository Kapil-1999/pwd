import { Component, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { APIDefinition, Columns, Config } from 'ngx-easy-table';

@Component({
  selector: 'area-list',
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.scss'
})
export class AreaListComponent {
  areaList: any[] = [];
  @ViewChild('table', { static: true }) table!: APIDefinition;


  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Deparment Master', path: '/admin/master/department-master' }
  ];
  public configuration!: Config;
  public columns!: Columns[];
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }
  bsModalRef!: BsModalRef;
  searchKeyword: any;

  ngOnInit() {
    this.setInitialtable()
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'City', title: 'City' },
      { key: 'Area', title: 'Area' },
      { key: 'Latitude', title: 'Latitude'},
      { key: 'Longitude', title: 'Longitude'},
      { key: 'Shape', title: 'Shape' },
      { key: 'Radius', title: 'Radius' },
      { key: 'Action', title: 'Action', width: "10%" },
    ];
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
}
