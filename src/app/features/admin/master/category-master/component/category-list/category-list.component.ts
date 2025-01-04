import { Component, NgZone } from '@angular/core';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
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
  categoryList:any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Category Master', path: '/admin/master/category-master' }
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
  startValue: number = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  bsModalRef!: BsModalRef;
  searchKeyword:any

  constructor(
    private modalService : BsModalService,
    private CategoryService: CategoryService,
    private notificationSerivce : NotificationService,
    private zone: NgZone
  ){}

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getCategoryList(this.page, this.tableSize)
  }

  setInitialtable() {
    this.columns = [
      { key: 'Category Name', title: 'Category Name' },
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

  getCategoryList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
  
    this.CategoryService.categoryList(page).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.categoryList = data?.body?.result;
        console.log("check cate", this.categoryList);
        
        this.totlRecords = data?.body?.rowCount;
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
    this.page = event; 
    this.startValue = (this.page - 1) * this.tableSize + 1;
    this.lastValue = this.page * this.tableSize; 
    this.lastValue = this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
    this.getCategoryList( this.page, this.tableSize)
  }
  
  
  onCreateCategory(value:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData:value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      AddCategoryComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {            
      this.getCategoryList(this.page, this.tableSize);
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
            this.getCategoryList(this.page, this.tableSize)
          } else {
            this.notificationSerivce.errorAlert(value?.title);
          }
        }
      );
    }
}






