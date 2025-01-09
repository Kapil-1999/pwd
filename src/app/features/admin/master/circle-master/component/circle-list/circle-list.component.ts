import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CircleService } from '../../service/circle.service';
import { CreateCircleComponent } from '../create-circle/create-circle.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'circle-list',
  templateUrl: './circle-list.component.html',
  styleUrl: './circle-list.component.scss'
})
export class CircleListComponent {
  circleList: any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Circle Master', path: '/admin/master/Circle-master' }
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
    private circleService: CircleService,
    private modalService: BsModalService,
    private notificationSerivce : NotificationService
  ) { }

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getCircleList()
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.' },
      { key: 'Zone Name', title: 'Zone Name' },
      { key: 'Circle Name', title: 'Circle Name' },
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


  getCircleList() {
    this.isLoading = true;
    this.circleService.circleList().subscribe((res) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      this.circleList = res?.body?.result || [];
      this.pagesize.count = this.circleList?.length;
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onCreateCircle(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateCircleComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getCircleList();
    });
  }


  onDeleteCircle(item: any) {
    let url = this.circleService.deleteCircle(item?.circle_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.circle_name,
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
          this.getCircleList();
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }


}
