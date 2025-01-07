import { Component, NgZone, ViewChild } from '@angular/core';
import { Config, Columns, DefaultConfig, APIDefinition } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { CategoryService } from '../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categoryList: any;
  @ViewChild('table', { static: true }) table!: APIDefinition;


  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Category Master', path: '/admin/master/category-master' }
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
    private commonService: CommonService,
    private modalService: BsModalService,
    private CategoryService: CategoryService,
    private notificationSerivce: NotificationService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getCategoryList()
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'Category Name', title: 'Category Name' },
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

  getCategoryList() {
    this.isLoading = true;
    const page = {
      pageNo: 1,
      pageSize: 5000,
    };
    this.CategoryService.categoryList(page).subscribe(
      (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        this.categoryList = data?.body?.result || [];
        this.pagesize.count = data?.body?.rowCount;
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
  }


  onCreateCategory(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      AddCategoryComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 10;
      this.getCategoryList()
    });
  }

  onDeletecategory(item: any) {
    let url = this.CategoryService.deleteCategory(item?.category_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.category_name,
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
          this.getCategoryList()
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


