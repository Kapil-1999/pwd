import { Component, NgZone } from '@angular/core';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { SubcategoryService } from '../../services/subcategory.service';
import { CreateSubcategoryComponent } from '../create-subcategory/create-subcategory.component';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss'
})
export class SubcategoryListComponent {
  categoryList: any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Subcategory Master', path: '/admin/master/subcategory-master' }
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
    private modalService: BsModalService,
    private subcategoryService: SubcategoryService,
    private notificationSerivce: NotificationService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getSubategoryList(this.pagesize.offset, this.pagesize.limit)
  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'Category Name', title: 'Category Name' },
      { key: 'Category Name', title: 'Subcategory Name' },
      {key:'Form Code', title: 'Form Code'},
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

  getSubategoryList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };

    this.subcategoryService.subcategoryList(page).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.categoryList = data?.body?.result || [];
        this.pagesize.count = data?.body?.totalRow;
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
    this.pagesize.offset = event;
    this.getSubategoryList(this.pagesize.offset, this.pagesize.limit)
  }

  paginationEvent($event: any): void {
    this.pagesize = {
      ...this.pagesize,
      limit: $event.pageSize,
      offset: $event.pageIndex + 1,
    };
    this.getSubategoryList(this.pagesize.offset, this.pagesize.limit)
  }

  onCreateCate(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateSubcategoryComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getSubategoryList(this.pagesize.offset, this.pagesize.limit)
    });
  }

  onDeletesub(item:any) {
    let url = this.subcategoryService.deleteSubCategory(item?.sub_category_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.sub_category_name,
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
          this.getSubategoryList(this.pagesize.offset, this.pagesize.limit)
        } else {
          this.notificationSerivce.errorAlert(value?.title);
        }
      }
    );
  }


  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getSubategoryList(this.pagesize.offset, this.pagesize.limit)
  }

}






