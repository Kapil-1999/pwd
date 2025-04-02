import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import {  setTypeUserOnMap, setUserCountData } from '../../../../core/app.selector';
import { setTypeUser, setvehicleData } from '../../../../core/app.action';

@Component({
  selector: 'swiper',
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss'
})
export class SwiperComponent {
  sliderOptionsForStatus: OwlOptions = {
    loop: false,
    nav: true,
    navText: [`<i class="fa fa-angle-double-left" aria-hidden="true"></i>`, `<i class="fa fa-angle-double-right" aria-hidden="true"></i>`],
    autoWidth: true,
    autoHeight: true,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 4,
      },
      740: {
        items: 5,
      },
      940: { items: 5 },
    },

    margin: 15,
  };
  status: any;
  CECount: any;
  SECount: any;
  EECount: any;
  AECount: any;
  JECount: any;
  adminCount: any;
  userData$:Observable<any>;
  vehicleStauts:any;
  selectedAlert: any = 'JE';

  constructor(
    private store : Store<AppState>
  ) {

    this.userData$ = this.store.select(setUserCountData)  
    this.userData$.subscribe({
      next: (user) => {        
        if (user) {
          this.vehicleStauts = user;
          this.formatUserData()
        }
      },
      error: (error) => {
        console.error('Error in vehicle subscription:', error);
      }
    });

    this.store.select(setTypeUserOnMap).subscribe((res: any) => {
      if(res) {
        this.selectedAlert = res;
      }
      
     })
  }

  formatUserData() {
    this.adminCount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 1);
    this.CECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 2);
    this.SECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 3);
    this.EECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 4);
    this.AECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 5);
    this.JECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 6);

    this.status = [
      // {
      //   src: "/assets/icons/feather-alert-octagon.svg",
      //   label: this.vehicleStauts?.length,
      //   class: '#696969',
      //   color: '#696969',
      //   status: 'All',
      //   data: this.vehicleStauts
      // },
      {
        src: "/assets/icons/awesome-gas-pump.svg",
        label: this.CECount?.length,
        class: this.selectedAlert == 'CE' ? 'blue' : '#696969',
        color:  this.selectedAlert == 'CE' ? 'blue' : '#696969',
        status: 'CE',
        data: this.CECount
      },
      {
        src: "/assets/icons/zocial-call.svg",
        label: this.SECount?.length,
        class: this.selectedAlert == 'SE' ? 'blue' : '#696969',
        color:  this.selectedAlert == 'SE' ? 'blue' : '#696969',
        status: "SE",
        data: this.SECount
      },
      {
        src: "/assets/icons/awesome-truck.svg",
        label: this.EECount?.length,
        class: this.selectedAlert == 'EE' ? 'blue' : '#696969',
        color:  this.selectedAlert == 'EE' ? 'blue' : '#696969',
        status: 'EE',
        data: this.EECount
      },
      {
        src: "/assets/icons/awesome-box.svg",
        label: this.AECount?.length,
        class: this.selectedAlert == 'AE' ? 'blue' : '#696969',
        color:  this.selectedAlert == 'AE' ? 'blue' : '#696969',
        status: "AE",
        data: this.AECount
      },
      {
        src: "/assets/icons/awesome-box.svg",
        label: this.JECount?.length,
        class: this.selectedAlert == 'JE' ? 'blue' : '#696969',
        color:  this.selectedAlert == 'JE' ? 'blue' : '#696969',
        status: "JE",
        data: this.JECount
      }
    ];
  }

  filterData(data: any) {        
    this.selectedAlert = data?.status;
    this.store.dispatch(setvehicleData({ vehicleData: data?.data }));
    this.formatUserData();
    this.store.dispatch(setTypeUser({ typeUser: data?.status }));
  }

}
