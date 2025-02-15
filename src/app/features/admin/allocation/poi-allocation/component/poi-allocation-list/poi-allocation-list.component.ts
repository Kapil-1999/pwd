import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { APIDefinition, Columns, Config } from 'ngx-easy-table';
import { PoiAllocationService } from '../../services/poi-allocation.service';
import { CreatePoiComponent } from '../create-poi/create-poi.component';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

@Component({
  selector: 'poi-allocation-list',
  templateUrl: './poi-allocation-list.component.html',
  styleUrl: './poi-allocation-list.component.scss'
})
export class PoiAllocationListComponent {
  poiAllocateList: any[] = [];
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

  constructor(
    private poiService: PoiAllocationService,
    private modalService: BsModalService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.setInitialtable();
    this.getPoiAllocationList(this.pagesize.offset, this.pagesize.limit)
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'Designation', title: 'Designation' },
      { key: 'User', title: 'User' },
      { key: 'Allocated Date', title: 'Allocated Date' },
      { key: 'Area', title: 'Area' },
      { key: 'Remark', title: 'Remark' },
      { key: 'Status', title: 'Status' },
      { key: 'Action', title: 'Action', width: "10%" },
    ];
  }

  getPoiAllocationList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.poiService.POIAllocation(page).subscribe((res: any) => {
      this.isLoading = false;
      this.poiAllocateList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  onCreatePoi(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreatePoiComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getPoiAllocationList(this.pagesize.offset, this.pagesize.limit)
    });
  }

  deletePOi(item: any) {
    let url = this.poiService.deleteAllocation(item?.poi_alloc_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.area_text,
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
          this.notificationService.successAlert(value?.body?.actionResponse);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getPoiAllocationList(this.pagesize.offset, this.pagesize.limit)
        } else {
          this.notificationService.errorAlert(value?.title);
        }
      }
    );
  }
}
