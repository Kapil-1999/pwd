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

  constructor(
    private districtService: DistrictService,
    private modalService: BsModalService,
    private notificationSerivce: NotificationService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable();
    this.getDistrictList(this.pagesize.offset, this.pagesize.limit)
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
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

  getDistrictList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.districtService.districtList(page).subscribe((res) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      this.districtList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }


  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getDistrictList(this.pagesize.offset, this.pagesize.limit)

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
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getDistrictList(this.pagesize.offset, this.pagesize.limit);
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
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getDistrictList(this.pagesize.offset, this.pagesize.limit);
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getDistrictList(this.pagesize.offset, this.pagesize.limit);

  }
}
