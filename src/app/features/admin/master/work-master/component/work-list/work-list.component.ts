import { Component, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { APIDefinition, Columns, Config } from 'ngx-easy-table';

@Component({
  selector: 'work-list',
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.scss'
})
export class WorkListComponent {
  workList: any[] = [];
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
      { key: 'Nature of Work', title: 'Nature of Work' },
      { key: 'Work Uniq ID', title: 'Work Uniq ID' },
      { key: 'Mobile No', title: 'Mobile No'},
      { key: 'Road Id', title: 'Road Id'},
      { key: 'Status', title: 'Status' },
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
