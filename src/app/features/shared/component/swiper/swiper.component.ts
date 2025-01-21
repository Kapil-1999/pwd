import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'swiper',
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss'
})
export class SwiperComponent {
  @Input() vehicleStauts: any;
  @Output() onConfirm = new EventEmitter()
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

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.adminCount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 1);
    this.CECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 2);
    this.SECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 3);
    this.EECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 4);
    this.AECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 5);
    this.JECount = this.vehicleStauts?.filter((res: any) => res?.designation_id == 6);

    this.status = [
      {
        src: "/assets/icons/feather-alert-octagon.svg",
        label: this.vehicleStauts?.length,
        class: '#696969',
        color: 'rgb(0 0 0)',
        status: 'All',
        data: this.vehicleStauts
      },
      // {
      //   src: "/assets/icons/feather-alert-octagon.svg",
      //   label: this.adminCount?.length,
      //   class: '#696969',
      //   color: 'rgb(0 0 0)',
      //   status: 'Admin',
      //   data: this.adminCount
      // },
      {
        src: "/assets/icons/awesome-gas-pump.svg",
        label: this.CECount?.length,
        class: 'green',
        color: 'rgb(25 173 0)',
        status: 'CE',
        data: this.CECount
      },
      {
        src: "/assets/icons/zocial-call.svg",
        label: this.SECount?.length,
        class: 'blue',
        color: '#4861ED',
        status: "SE",
        data: this.SECount
      },
      {
        src: "/assets/icons/awesome-truck.svg",
        label: this.EECount?.length,
        class: 'orange',
        color: '#FFAF1D',
        status: 'EE',
        data: this.EECount
      },
      {
        src: "/assets/icons/awesome-box.svg",
        label: this.AECount?.length,
        class: 'gray',
        color: '#414141',
        status: "AE",
        data: this.AECount
      },
      {
        src: "/assets/icons/awesome-box.svg",
        label: this.JECount?.length,
        class: 'rgb(104 100 100)',
        color: '#414141',
        status: "JE",
        data: this.JECount
      }
    ];
  }

  filterData(data: any) {
    this.storageService.setItem('status', data.status)
    this.onConfirm.emit(data);
  }

}
