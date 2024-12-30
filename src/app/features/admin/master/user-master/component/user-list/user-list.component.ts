import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { UserMasterService } from '../../services/user-master.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList: any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'User Master', path: '/admin/master/user-master' }
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
  deparmentList:any
  config = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Department`,
  };
  config1 = {
    displayKey: "text",
    search: true,
    height: '300px',
    placeholder: `Select Designation`,
  };
  desigantionList:any;
  selectedDepartment: any;
  selectedDesignation: any;

  constructor(
    private userService: UserMasterService,
    private modalService: BsModalService,
    private commonservice : CommonService,
    private tosterService : NotificationService
  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable();
    this.getUserList();
    this.getDepartmentList();
    this.getDesignationList()
  }


  setInitialtable() {
    this.columns = [
      { key: 'Chief Engineer', title: 'Chief Engineer' },
      { key: 'Zone', title: 'Zone' },
      { key: 'Supritending', title: 'Supritending' },
      { key: 'Circle', title: 'Circle' },
      { key: 'Ex Engineer', title: 'Ex Engineer' },
      { key: 'City', title: 'City' },
      { key: 'Assistant Engineer', title: 'Assistant Engineer' },
      { key: 'Division', title: 'Division' },
      { key: 'Junior Engineer', title: 'Junior Engineer' },
      { key: 'Contact No.', title: 'Contact No.' },
      { key: 'Email', title: 'Email' },
      { key: 'Image', title: 'Image' },
      { key: 'Status', title: 'Status'},
      { key: 'Action', title: 'Action' },
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

  getDepartmentList() {
    this.commonservice.departmentList().subscribe((res)=> {
      this.deparmentList = res?.body?.result;
      this.selectedDepartment = this.deparmentList[0]
    })
  }

  getUserList() {
    this.isLoading = false;
    this.userService.userList().subscribe((res) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      this.userList = res?.body?.result;
      this.totlRecords = this.userList.length;
    })
  }

  getDesignationList() {
    this.commonservice.designationList().subscribe((res)=> {
      this.desigantionList = res?.body?.result
    })
  }


  onTablePageChange(event: number) {
    this.page = event;
    this.startValue = (this.page - 1) * this.tableSize + 1;
    this.lastValue = this.page * this.tableSize;
    this.lastValue = this.lastValue > this.totlRecords ? this.totlRecords : this.lastValue;
  }

 
  onCreateuser(value: any) {
    
    if (this.selectedDepartment.length == 0 || this.selectedDesignation.length == 0) {
      this.tosterService.showWarning('Please select both Department and Designation before creating a user.');
      return; // Prevent further execution
    } else {

      const initialState: ModalOptions = {
        initialState: {
          editData: value ? value : '',
          department : this.selectedDepartment,
          designation : this.selectedDesignation
        },
      };
      this.bsModalRef = this.modalService.show(
        CreateUserComponent,
        Object.assign(initialState, {
          class: 'modal-lg modal-dialog-centered alert-popup',
        })
      );
      this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
        this.getUserList();
      });
    }
  }
}
