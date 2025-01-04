import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { DistrictService } from '../../services/district.service';
import { CreateDistrictComponent } from '../create-district/create-district.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'district-list',
  templateUrl: './district-list.component.html',
  styleUrl: './district-list.component.scss'
})
export class DistrictListComponent {
  districtList: any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'District Master', path: '/admin/master/disrict-master' }
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
  searchKeyword: any;

  constructor(
    private districtService: DistrictService,
    private modalService: BsModalService,
    private notificationSerivce: NotificationService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable();
    this.getDistrictList()
  }

  setInitialtable() {
    this.columns = [
      { key: 'Circle Name', title: 'Circle Name' },
      { key: 'District Name', title: 'District Name' },
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

  getDistrictList() {
    this.isLoading = true;
    this.districtService.districtList().subscribe((res) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      this.districtList = res?.body?.result;
      this.totlRecords = this.districtList.length;
    })
  }


  onTablePageChange(event: number) {
    this.page = event;
    this.startValue = (this.page - 1) * this.tableSize + 1;
    this.lastValue = this.page * this.tableSize;
    this.lastValue = this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
  }

  onCreateDistrict(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateDistrictComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.getDistrictList();
    });
  }


  onDeleteDistrict(item: any) {
    let url = this.districtService.deleteDistrict(item?.circle_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.district_name,
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
          this.getDistrictList();
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }
}
