import { Component, NgZone, ViewChild } from '@angular/core';
import { Config, Columns, DefaultConfig, APIDefinition } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { DesignationService } from '../../services/designation.service';
import { CreateDesignationComponent } from '../create-designation/create-designation.component';

@Component({
  selector: 'designation-list',
  templateUrl: './designation-list.component.html',
  styleUrl: './designation-list.component.scss'
})
export class DesignationListComponent {
  designationList: any[] = [];
  @ViewChild('table', { static: true }) table!: APIDefinition;


  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Designation Master', path: '/admin/master/designation-master' }
  ];
  public configuration!: Config;
  public columns!: Columns[];
  isLoading: boolean = false;
  pagesize = {
    limit: 10,
    offset: 1,
    count: 0,
  };

  bsModalRef!: BsModalRef;
  searchKeyword: any
  constructor(
    private modalService: BsModalService,
    private designationService: DesignationService,
    private notificationSerivce: NotificationService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getDesignationList()
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'Designation Name', title: 'Designation Name' },
      { key: 'Description', title: 'Description' },
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

  getDesignationList() {
    this.isLoading = true;
    const page = {
      pageNo: 1,
      pageSize: 5000,
    };
    this.designationService.desigantion(page).subscribe(
      (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        this.designationList = data?.body?.result || [];
        this.pagesize.count = data?.body?.rowCount;
      },
      (error) => {
        setTimeout(() => {
          this.isLoading = false;
          this.designationList = []
        }, 600);
        console.error("Error fetching Designation list", error);
      }
    );
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onCreateDesignation(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateDesignationComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 10;
      this.getDesignationList()
    });
  }

  onDeleteDesignation(item: any) {
    let url = this.designationService.deleteDesigantion(item?.dept_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.department_name,
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
          this.pagesize.limit = 10;
          this.getDesignationList()
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }

  paginationEvent($event: any): void {
    this.pagesize = {
      ...this.pagesize,
      limit: $event.pageSize,
      offset: $event.pageIndex + 1,
    };
  }


}


