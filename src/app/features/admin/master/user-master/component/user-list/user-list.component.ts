import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { UserMasterService } from '../../services/user-master.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CommonService } from '../../../../../shared/services/common.service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { CrateChiefEngComponent } from '../crate-chief-eng/crate-chief-eng.component';
import { CrateSupritendingEngComponent } from '../crate-supritending-eng/crate-supritending-eng.component';
import { CrateExecutiveEngComponent } from '../crate-executive-eng/crate-executive-eng.component';
import { CrateAssitantEngComponent } from '../crate-assitant-eng/crate-assitant-eng.component';
import { CrateJuniorEngComponent } from '../crate-junior-eng/crate-junior-eng.component';
import { IMG_URL } from '../../../../../shared/constant/menu/menu';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';


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
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  bsModalRef!: BsModalRef;
  searchKeyword: any = '';
  deparmentList: any
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
  desigantionList: any;
  selectedDepartment: any;
  selectedDesignation: any;
  imgeUrl = IMG_URL;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }

  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private userService: UserMasterService,
    private modalService: BsModalService,
    private commonservice: CommonService,
    private tosterService: NotificationService,

  ) { };

  ngOnInit() {
    this.tableProperty();
    this.setInitialtable();
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);
    this.getDepartmentList();
    this.getDesignationList()
  }


  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No' },
      { key: 'Department', title: 'Department' },
      { key: 'Designation', title: 'Designation' },
      { key: 'Name', title: 'Name' },
      { key: 'Contact No.', title: 'Contact No.' },
      { key: 'Email', title: 'Email' },
      { key: 'Division', title: 'Division' },
      { key: 'Assistant Engineer', title: 'Assistant Engineer' },
      { key: 'Ex Engineer', title: 'Ex Engineer' },
      { key: 'City', title: 'City' },
      { key: 'Supritending', title: 'Supritending' },
      { key: 'Circle', title: 'Circle' },
      { key: 'Chief Engineer', title: 'Chief Engineer' },
      { key: 'Zone', title: 'Zone' },
      { key: 'Image', title: 'Image' },
      { key: 'Status', title: 'Status' },
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
    this.commonservice.departmentList().subscribe((res) => {
      this.deparmentList = res?.body?.result;
      this.selectedDepartment = this.deparmentList[0]
    })
  }

  getUserList(pagedata: any, tableSize: any, searchKeyword:any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
      searchText : searchKeyword
    };
    this.userService.userList(page).subscribe((res) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      
      this.userList = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow;
    })
  }

  getDesignationList() {
    this.commonservice.designationList().subscribe((res) => {
      this.desigantionList = res?.body?.result
    })
  }


  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);

  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);

  }


  onCreateuser(value: any) {    
    if(value === '') {
      if (this.selectedDepartment.length == 0 || this.selectedDesignation.length == 0) {
        this.tosterService.showWarning('Please select both Department and Designation before creating a user.');
        return;
      } else {
        let createCompenent: any;
        if (this.selectedDesignation?.value === '1') {
          createCompenent = CreateUserComponent
        } else if (this.selectedDesignation?.value === '2') {
          createCompenent = CrateChiefEngComponent
        } else if (this.selectedDesignation?.value === '3') {
          createCompenent = CrateSupritendingEngComponent
        } else if (this.selectedDesignation?.value === '4') {
          createCompenent = CrateExecutiveEngComponent
        } else if (this.selectedDesignation?.value == "5") {
          createCompenent = CrateAssitantEngComponent;
        } else if (this.selectedDesignation?.value == "6") {
          createCompenent = CrateJuniorEngComponent;
        }
  
        const initialState: ModalOptions = {
          initialState: {
            editData: value ? value : '',
            department: this.selectedDepartment,
            designation: this.selectedDesignation
          },
        };
        this.bsModalRef = this.modalService.show(
          createCompenent,
          Object.assign(initialState, {
            class: 'modal-lg modal-dialog-centered alert-popup',
          })
        );
        this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);

        });
      }
    } else {
      let createCompenent: any;
    
        if (value?.designation_id === 1) {
          createCompenent = CreateUserComponent
        } else if (value?.designation_id === 2) {
          createCompenent = CrateChiefEngComponent
        } else if (value?.designation_id === 3) {
          createCompenent = CrateSupritendingEngComponent
        } else if (value?.designation_id === 4) {
          createCompenent = CrateExecutiveEngComponent
        } else if (value?.designation_id == 5) {
          createCompenent = CrateAssitantEngComponent;
        } else if (value?.designation_id == 6) {
          createCompenent = CrateJuniorEngComponent;
        }
        let designation = {
          value : value?.designation_id.toString()
        }
        let department = {
          value : value?.department_id.toString()
        }
        const initialState: ModalOptions = {
          initialState: {
            editData: value ? value : '',
            department: department,
            designation: designation
          },
        };
        this.bsModalRef = this.modalService.show(
          createCompenent,
          Object.assign(initialState, {
            class: 'modal-lg modal-dialog-centered alert-popup',
          })
        );
        this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);

        });
    }
  }

  deleteUser(item: any) {
    let url = this.userService.deleteUser(item?.user_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.full_name,
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
          this.tosterService.successAlert(value?.body?.actionResponse);
          this.pagesize.offset = 1;
          this.pagesize.limit = 25;
          this.getUserList(this.pagesize.offset, this.pagesize.limit, this.searchKeyword);

        } else {
          this.tosterService.errorAlert(value?.title);
        }
      }
    );
  }

  onSearch(event:any) {
    this.userList = [];
    this.pagesize.offset = 1;
    this.pagesize.limit = 25;
    this.getUserList(this.pagesize.offset, this.pagesize.limit, event.target.value);  
  }
}
