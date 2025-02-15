import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { APIDefinition, Columns, Config } from 'ngx-easy-table';
import { CreateAreaComponent } from '../create-area/create-area.component';
import { AreaService } from '../../services/area.service';
import { DeleteConfirmationComponent } from '../../../../../shared/component/delete-confirmation/delete-confirmation.component';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { AreaMapComponent } from '../area-map/area-map.component';
import { CommonService } from '../../../../../shared/services/common.service';
import { AreaGoogleMapComponent } from '../area-google-map/area-google-map.component';

@Component({
  selector: 'area-list',
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.scss'
})
export class AreaListComponent {
  areaData: any[] = [];
  @ViewChild('table', { static: true }) table!: APIDefinition;


  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Deparment Master', path: '/admin/master/department-master' }
  ];
  public configuration!: Config;
  public columns!: Columns[];
  isLoading: boolean = true;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  userData: any;
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
    private modalService: BsModalService,
    private areaService: AreaService,
    private notificationService: NotificationService,
    private commonService : CommonService
  ) { }

  ngOnInit() {
    this.userData = this.commonService.getUserDetails();

    this.setInitialtable();
    this.getAreaList(this.pagesize.offset, this.pagesize.limit)

  }

  setInitialtable() {
    this.columns = [
      { key: 'S No.', title: 'S No.', width: "5%" },
      { key: 'City', title: 'City' },
      { key: 'Area', title: 'Area' },
      { key: 'Latitude', title: 'Latitude' },
      { key: 'Longitude', title: 'Longitude' },
      { key: 'Shape', title: 'Shape' },
      { key: 'Radius', title: 'Radius' },
      { key: 'Status', title: 'Status' },
      { key: 'Action', title: 'Action', width: "10%" },
      { key: 'Show On Map', title: 'Show On Map' },
    ];
  }

  getAreaList(pagedata: any, tableSize: any) {
    this.isLoading = true;
    const page = {
      pageNo: pagedata,
      pageSize: tableSize,
    };
    this.areaService.areaList(page).subscribe((res: any) => {
      this.isLoading = false;
      this.areaData = res?.body?.result || [];
      this.pagesize.count = res?.body?.totalRow
    });
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
    this.getAreaList(this.pagesize.offset, this.pagesize.limit)

  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
    this.getAreaList(this.pagesize.offset, this.pagesize.limit)

  }

  onCreateArea(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: value ? value : ''
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateAreaComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );

    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getAreaList(this.pagesize.offset, this.pagesize.limit);
    });
  }

  deleteArea(item: any) {
    let url = this.areaService.deleteArea(item?.area_id)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.area_name,
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
          this.getAreaList(this.pagesize.offset, this.pagesize.limit)
        } else {
          this.notificationService.errorAlert(value?.title);
        }
      }
    );
  }

  showOnMap(value:any) {
    let component :any;
    if (this.userData?.is_gmap_enabled === 0) {
      component =  AreaMapComponent
    } else if(this.userData?.is_gmap_enabled === 1) {
      component = AreaGoogleMapComponent
    }
    const initialState: ModalOptions = {
      initialState: {
        mapData: value ? value : '',
        mapType : 'show on Map'
      },
    };
    this.bsModalRef = this.modalService.show(
      component,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
  }
}
