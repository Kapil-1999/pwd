import { Component } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateZoneComponent } from '../create-zone/create-zone.component';

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrl: './zone-list.component.scss'
})
export class ZoneListComponent {
  zoneList: any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Zone Master', path: '/admin/master/zone-master' }
  ];
  public configuration!: Config;
  public columns!: Columns[];
  isLoading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  totlRecords: any;
  pageIndex: number = 1;
  tableItemsSize: number = 25;
  startValue: number =
    this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  bsModalRef!: BsModalRef;



  constructor(
    private commonService: CommonService,
    private modalService : BsModalService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getZoneList()
  }

  setInitialtable() {
    this.columns = [
      { key: 'Zone Name', title: 'Zone Name' },
      { key: 'State Name', title: 'State Name' },
      { key: 'Status', title: 'Status'},
      { key: 'Action', title: 'Action'},
    ];
  }


  // for table property Method here
  tableProperty() {

    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
  }

  getZoneList() {
    this.commonService.zoneList().subscribe(
      (data) => {
        this.zoneList = data?.body?.result;
        this.totlRecords = this.zoneList.length;
      },
      (error) => {
        console.error("Error fetching zone list", error);
      }
    );
  }

  onTablePageChange(event: number) {
    this.page = event; 
    this.startValue = (this.page - 1) * this.tableSize + 1;
    this.lastValue = this.page * this.tableSize; 
    this.lastValue = this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
  }


  onCreateZone(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateZoneComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getZoneList();
    });
  }
  

}




