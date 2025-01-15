import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'swiper',
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss'
})
export class SwiperComponent {
  @Input() vehicleStauts: any;
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
  status:  any = [
    {
      src: "/assets/icons/zocial-call.svg",
      label: 6,
      class: 'blue',
      color: '#4861ED',
      status: "CE",
      data:7
    },
    {
      src: "/assets/icons/awesome-truck.svg",
      label: 1,
      class: 'orange',
      color: '#FFAF1D',
      status: 'SE',
      data: 1
    },
    {
      src: "/assets/icons/awesome-box.svg",
      label: 3,
      class: 'gray',
      color: '#414141',
      status: "EE",
      data: 3
    },
    {
      src: "/assets/icons/awesome-box.svg",
      label: 8,
      class: 'rgb(104 100 100)',
      color: '#414141',
      status: "AE",
      data: 4
    },
    {
      src: "/assets/icons/awesome-box.svg",
      label: 5,
      class: '#ADADAD',
      color: '#414141',
      status: "JE",
      data: 5
    },
  ];

  ngOnInit() { 

  }

  
}
