import { Component, ViewChild } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
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
  @ViewChild('table', { static: true }) table!: APIDefinition;


  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Zone Master', path: '/admin/master/zone-master' }
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
  searchKeyword: any
  constructor(
    private commonService: CommonService,
    private modalService: BsModalService,
    private zoneService: ZoneService,
    private notificationSerivce: NotificationService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getZoneList(this.pagesize.offset, this.pagesize.limit)
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Zone Name', title: 'Zone Name' },
      { key: 'State Name', title: 'State Name' },
      { key: 'Status', title: 'Status', width: "5%" },
      { key: 'Action', title: 'Action', width: "10%" },
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

  getZoneList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.zoneService.zoneList(page).subscribe(
      (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        this.zoneList = data?.body?.result || [];
        this.pagesize.count = data?.body?.totalRow;
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
    this.pagesize.offset = event;
    this.getZoneList(this.pagesize.offset, this.pagesize.limit)
  }


  onCreateZone(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateZoneComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getZoneList(this.pagesize.offset, this.pagesize.limit)

    });
  }

  onDeleteZone(item: any) {
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
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getZoneList(this.pagesize.offset, this.pagesize.limit)

        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getZoneList(this.pagesize.offset, this.pagesize.limit)

  }


}