import { Component, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { APIDefinition, Columns, Config } from 'ngx-easy-table';

@Component({
  selector: 'duty-allocation-list',
  templateUrl: './duty-allocation-list.component.html',
  styleUrl: './duty-allocation-list.component.scss'
})
export class DutyAllocationListComponent {
  areaList: any[] = [];
  @ViewChild('table', { static: true }) table!: APIDefinition;
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
      { key: 'Type', title: 'Type' },
      { key: 'Name', title: 'Name'},
      { key: 'Area', title: 'Area'},
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
