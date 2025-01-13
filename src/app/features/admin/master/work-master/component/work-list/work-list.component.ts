import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { APIDefinition, Columns, Config } from 'ngx-easy-table';
import { WorkService } from '../../services/work.service';
import { CreateWorkComponent } from '../create-work/create-work.component';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';

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

  constructor(
    private workService: WorkService,
    private modalService: BsModalService,
    private notificationSerivce : NotificationService
  ) { }

  ngOnInit() {
    this.setInitialtable();
    this.getWorkList(this.pagesize.offset, this.pagesize.limit)
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'Nature of Work', title: 'Nature of Work' },
      { key: 'Work Uniq ID', title: 'Work Uniq ID' },
      { key: 'Mobile No', title: 'Mobile No' },
      { key: 'Road Id', title: 'Road Id' },
      { key: 'Status', title: 'Status' },
      { key: 'Action', title: 'Action', width: "10%" },
    ];
  }

  getWorkList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.workService.workList(page).subscribe((res: any) => {
      this.isLoading = false;
      this.workList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow
    })
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getWorkList(this.pagesize.offset, this.pagesize.limit)
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getWorkList(this.pagesize.offset, this.pagesize.limit)
  }

  onCreateWork(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateWorkComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getWorkList(this.pagesize.offset, this.pagesize.limit)
    });
  }


  deleteWork(item: any) {
      let url = this.workService.deleteWork(item?.work_id)
      const initialState: ModalOptions = {
        initialState: {
          title: item?.work_unique_code,
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
            this.getWorkList(this.pagesize.offset, this.pagesize.limit)
          } else {
            this.notificationSerivce.errorAlert(value?.title);
          }
        }
      );
    }
}
