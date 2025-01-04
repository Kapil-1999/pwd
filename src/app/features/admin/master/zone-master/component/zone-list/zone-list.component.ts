import { Component } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateZoneComponent } from '../create-zone/create-zone.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';

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
  tableSize = 10;
  totlRecords: any;
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number =
    this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  bsModalRef!: BsModalRef;
  searchKeyword:any



  constructor(
    private commonService: CommonService,
    private modalService : BsModalService,
    private zoneService: ZoneService,
    private notificationSerivce : NotificationService
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

  getZoneList() {
    this.isLoading = true;
    this.zoneService.zoneList().subscribe(
      (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        this.zoneList = data?.body?.result;
        this.totlRecords = this.zoneList.length;
      },
      (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
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

  onDeleteZone(item:any) {        
    let url = this.zoneService.deleteZone(item?.zone_id);
    const initialState: ModalOptions = {
      initialState: {
        title: item?.zone_name,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {        
        if (value?.status == 200) {
          this.notificationSerivce.successAlert(value?.body?.actionResponse);
          this.getZoneList()
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }
  

}




