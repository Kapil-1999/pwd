import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AreaAllotDetailsPopupComponent } from '../area-allot-details-popup/area-allot-details-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-je-details',
  templateUrl: './je-details.component.html',
  styleUrls: ['./je-details.component.scss']
})
export class JeDetailsComponent {
  bsModalRef!: BsModalRef;
  columns: any;
  categoryList :any;
  accordionItems :any;
  openItemId: number | null = null; 
  isLoading: boolean = false;
  id: any;
  desiId: any
  wrokId: any;
  showCategory: number | null = null; 
  workList: any;
  taskId: any;
  previousUrl :any;

  constructor(
    private bsmoalService: BsModalService,
    private route : ActivatedRoute, 
    private dashboardService : DashboardService,
    private router: Router,
    private location : Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['previousUrl']) {
      this.previousUrl = navigation.extras.state['previousUrl'];
    }
  }

  ngOnInit() {
    this.route?.paramMap.subscribe(params => {      
      this.id = params.get('id'); 
      this.desiId = params.get('desiId'); 
      this.poiAreaList()
    });
    this.setInitialtable();
  }

  setInitialtable() {
    this.columns = [
      { key: 'Category Name', title: 'Category Name' },
      { key: 'Total Work', title: 'Total Work', width: "5%" },
      { key: 'Work Status', title: 'Work Status', width: "5%" },
      { key: 'Work List', title: 'Work List', width: "10%" },
    ];
  }

  poiAreaList(){
    let payload = {
      userId : Number(this.id),
      userDesigId : Number(this.desiId)
    }
    this.dashboardService.workListByUser(payload).subscribe((res:any) => {
      this.accordionItems = res?.body?.result || [];      
    })
  }


  getCategoryList(wrokId: number) {
    this.isLoading = true;
    this.dashboardService.categoryListByArea(wrokId).subscribe(
      (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        this.categoryList = data?.body?.result || [];
      }
    );
  }

  openAreaPlot(item:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: item,
        taskId : this.taskId
      },
    };
    this.bsModalRef = this.bsmoalService.show(
      AreaAllotDetailsPopupComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-lg modal-dialog-centered alert-popup',
      })
    );
  }

  goBack() {
    this.location.back();
  }

  onOpenWork(itemId: number, workId:any) {
    if (this.openItemId === itemId) {
      this.openItemId = null;
      this.wrokId = null;
    } else {
      this.openItemId = itemId;
      this.wrokId = workId
      this.poiWorkList(this.wrokId);
    }
  }

  poiWorkList(workid:any){
    let payload = {
      workId : workid
    }
    this.dashboardService.workAreaList(payload).subscribe((res:any) => {
      this.workList = res?.body?.result || [];      
    })
  }

  onOpenCategory(id: number,areaid:any) {
    if (this.showCategory === areaid) {
      this.showCategory = null;
      this.taskId = null 
    } else {
      this.showCategory = areaid;
      this.taskId = id
      this.getCategoryList(id)
    }
  }
  
}