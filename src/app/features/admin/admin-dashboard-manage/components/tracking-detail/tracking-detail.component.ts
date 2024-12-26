import { Component } from '@angular/core';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrl: './tracking-detail.component.scss'
})
export class TrackingDetailComponent {
  activeCardIndex: number | null = null;

  trackingData = [
    {
      colorId:1,
      name: 'CE Agra',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 1, EE: 4, AE: 5, JE: 3 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:2,
      name: 'CE Aligarh',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 2, EE: 13, AE: 1, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:3,
      name: 'CE Ayodhya',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 2, EE: 12, AE: 0, JE: 0 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 3, EE: 7, AE: 2, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 3, EE: 7, AE: 2, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 3, EE: 7, AE: 2, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 3, EE: 7, AE: 2, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 3, EE: 7, AE: 2, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'assets/images/dummy-man.png',
      active: true,
      stats: { SE: 3, EE: 7, AE: 2, JE: 1 },
      timer: '00h 00m',
      details: {
        time: '2024-12-16 18:07:02',
        lat: '28.5785341',
        lng: '77.3138334',
        gps: 'On',
        battery: '16%',
        distance: '0 KM'
      }
    },
  ];
  ngOnInit(){}


  /**
   * details about user
   * @param index 
   * @param event 
   */
  toggleDetails(index: number, event: Event): void {
    event.preventDefault();
    this.activeCardIndex = this.activeCardIndex === index ? null : index;
  }

  /**
   * colour change based on status
   * @param value 
   * @returns 
   */
  getColor(value:any){    
    if (value?.colorId == 1) {
      return 'status-1';
    } else if (value?.colorId == 2) {
      return 'status-2';
    } else if (value?.colorId == 3) {
      return 'status-3';
    } else if (value?.colorId == 4) {
      return 'status-4';
    } else {
      return 'status';
    }
  }
}
