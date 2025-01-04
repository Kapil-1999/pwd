import { Component, NgZone } from '@angular/core';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.scss'
})
export class SubcategoryListComponent {
  categoryList:any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Subcategory Master', path: '/admin/master/subcategory-master' }
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
    private subcategoryService: SubcategoryService,
    private notificationSerivce : NotificationService,
    private zone: NgZone
  ){}

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable()
    this.getSubategoryList(this.page, this.tableSize)
  }

  setInitialtable() {
    this.columns = [
      { key: 'Category Name', title: 'Category Name' },
      { key: 'Category Name', title: 'Subcategory Name' },
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

  getSubategoryList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
  
    this.subcategoryService.subcategoryList(page).subscribe(
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
    this.getSubategoryList( this.page, this.tableSize)
  }

}






