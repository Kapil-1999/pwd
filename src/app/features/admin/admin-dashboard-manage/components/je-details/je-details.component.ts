import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AreaAllotDetailsPopupComponent } from '../area-allot-details-popup/area-allot-details-popup.component';
import { CategoryService } from '../../../master/category-master/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';

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
  taskId: any;
  constructor(
    private bsmoalService: BsModalService,
    private CategoryService : CategoryService,
    private route : ActivatedRoute, 
    private dashboardService : DashboardService
  ) {}

  ngOnInit() {
    this.route?.paramMap.subscribe(params => {      
      this.id = params.get('id'); 
      this.desiId = params.get('desiId'); 
      this.poiWorkList()
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

  poiWorkList(){
    let payload = {
      userId : Number(this.id),
      userDesigId : Number(this.desiId)
    }
    this.dashboardService.workAreaList(payload).subscribe((res:any) => {
      this.accordionItems = res?.body?.result || [];      
    })
  }


  getCategoryList(taskId: number) {
    this.isLoading = true;
    this.dashboardService.categoryListByArea(taskId).subscribe(
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

  onOpenCategory(itemId: number, taskId:number) {
    if (this.openItemId === itemId) {
      this.openItemId = null;
      this.categoryList = [];
      this.taskId = null;
    } else {
      this.taskId = taskId;
      this.openItemId = itemId;
      this.getCategoryList(taskId);
    }
  }
  
}