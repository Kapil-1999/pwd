import { Component, NgZone } from '@angular/core';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DivisionService } from '../../service/division.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CreateDivisionComponent } from '../create-division/create-division.component';

@Component({
  selector: 'division-list',
  templateUrl: './division-list.component.html',
  styleUrl: './division-list.component.scss'
})
export class DivisionListComponent {
  divisionListData:any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Division Master', path: '/admin/master/division-master' }
  ];

  public configuration!: Config;
  public columns!: Columns[];
  isLoading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 10;
  totlRecords: any;
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  bsModalRef!: BsModalRef;
  searchKeyword:any

  constructor(
    private modalService : BsModalService,
    private divisionService: DivisionService,
    private notificationSerivce : NotificationService,
    private zone: NgZone
  ){}

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getDivisionList(this.page, this.tableSize)
  }

  setInitialtable() {
    this.columns = [
      { key: 'Zone Name', title: 'Zone Name' },
      { key: 'Circle Name', title: 'Circle Name' },
      { key: 'City Name', title: 'City Name' },
      { key: 'Division Name', title: 'Division Name' },
      { key: 'Status', title: 'Status',width: "5%"},
      { key: 'Action', title: 'Action', width: "10%"},
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

  getDivisionList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
  
    this.divisionService.divisionList(page).subscribe(
      (data) => {
        this.isLoading = false;
        this.divisionListData = data?.body?.result;
        this.totlRecords = data?.body?.rowCount;
      },
      (error) => {
        console.error("Error fetching division list", error);
        this.zone.run(() => {
          this.isLoading = false;
        });
      }
    );
  }

  onTablePageChange(event: number) {
    this.page = event; 
    this.startValue = (this.page - 1) * this.tableSize + 1;
    this.lastValue = this.page * this.tableSize; 
    this.lastValue = this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
    this.getDivisionList( this.page, this.tableSize)
  }
  
  
  onCreateDivision(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateDivisionComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {            
      this.getDivisionList(this.page, this.tableSize);
    });
  }

  onDeleteZone(item:any) {
    this.divisionService.deleteDivision(item?.zone_id).subscribe((res:any)=> {
      if(res?.status == 200) {
        this.notificationSerivce.successAlert(res?.body?.actionResponse);
      } else {
        this.notificationSerivce.errorAlert(res?.title);
      }
    })
  }
}

