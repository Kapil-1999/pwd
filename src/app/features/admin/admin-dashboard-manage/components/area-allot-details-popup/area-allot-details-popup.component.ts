import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-area-allot-details-popup',
  templateUrl: './area-allot-details-popup.component.html',
  styleUrl: './area-allot-details-popup.component.scss'
})
export class AreaAllotDetailsPopupComponent {
  editData :any;
  taskId :any
  accordionItems :any

  constructor(
    private bsmodalService : BsModalService,
    private router : Router,
    private dashboardService : DashboardService
  ){};

  ngOnInit() {
    this.getSubCategoryByList()
  };

  getSubCategoryByList() {
    let data = {
      taskId: this.taskId,
      categoryId : this.editData?.category_id
    }
    this.dashboardService.subCategoryListByCat(data).subscribe((res:any) => {
      this.accordionItems = res?.body?.result;
      this.accordionItems =this.accordionItems.map((val:any) => (
        {
          ...val, isOpen : false
        }
      ))
    })
  }

  toggleAccordion(id: number) {
    this.accordionItems = this.accordionItems.map((item:any) => ({
      ...item,
      isOpen: item.sub_category_id === id ? !item.isOpen : false, 
    }));
  }

  openAreaForm() {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/admin/dashboard/area-plot-form']));
    window.open(url, '_blank');
  }

  close() {
    this.bsmodalService.hide()
  }
}
