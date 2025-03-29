import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DashboardService } from '../../service/dashboard.service';
import { IMG_URL } from '../../../../shared/constant/menu/menu';
import { CommonService } from '../../../../shared/services/common.service';
import { AddressCacheService } from '../../../../shared/services/address.service';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-area-allot-details-popup',
  templateUrl: './area-allot-details-popup.component.html',
  styleUrl: './area-allot-details-popup.component.scss'
})
export class AreaAllotDetailsPopupComponent {
  editData :any;
  taskId :any
  accordionItems :any
  selectedsubCat: any;
  taskData: any;
  IMG_URL = IMG_URL;

  constructor(
    private bsmodalService : BsModalService,
    private router : Router,
    private dashboardService : DashboardService,
    private commonServive : CommonService,
    private addressCache : AddressCacheService
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

  toggleAccordion(data: any) {
    this.selectedsubCat = data;
    const previousState = this.accordionItems.find((item: any) => item.sub_category_id === data.sub_category_id)?.isOpen;
    
    this.accordionItems = this.accordionItems.map((item: any) => ({
      ...item,
      isOpen: item.sub_category_id === data.sub_category_id ? !item.isOpen : false,
    }));

    const currentItem = this.accordionItems.find((item: any) => item.sub_category_id === data.sub_category_id);
    if (currentItem?.isOpen && !previousState) {
      this.getTaskData();
    }
  }

  getTaskData() {
    let payload = {
      taskDetId : this.selectedsubCat?.task_det_id,
      catId : this.selectedsubCat?.category_id,
      subCatId : this.selectedsubCat?.sub_category_id
    }
    this.dashboardService.taskData(payload).subscribe((res:any) => {
      this.taskData = res?.body?.result || [];
    })
  }

  openAreaForm(item:any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/admin/dashboard/area-plot-form', item?.form_code], {
        queryParams: { cat: this.taskId, subCat: item?.sub_category_id, task: item?.task_det_id }
      })
    );
    window.open(url, '_blank');
  }

  close() {
    this.bsmodalService.hide()
  }



getAddress(lat: number, lng: number): Observable<string> {
  const cachedAddress = this.addressCache.getCachedAddress(lat, lng);
  if (cachedAddress) {
    return of(cachedAddress); // Return cached address as an Observable
  }

  return this.commonServive.addressApi({ lat, lng }).pipe(
    map((res: any) => {
      const address = res?.results[0]?.formatted_address || 'Location not available';
      this.addressCache.setCachedAddress(lat, lng, address); // Cache the address
      return address;
    }),
    catchError(() => {
      return of('Location not available'); // Handle errors
    })
  );
}
}
