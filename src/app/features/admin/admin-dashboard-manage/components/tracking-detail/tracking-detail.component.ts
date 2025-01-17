import { Component } from '@angular/core';
import { AE_DATA, EE_DATA, JE_DATA, SE_DATA } from '../../../../shared/constant/menu/menu';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrl: './tracking-detail.component.scss'
})
export class TrackingDetailComponent {
  activeCardIndex: number | any = null;

  trackingData:any = [
    {
      colorId:1,
      name: 'CE Agra',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 1}, EE: {id: 3, value: 2}, AE: {id: 4, value: 6}, JE: {id: 5, value: 4} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:2,
      name: 'CE Aligarh',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 6}, EE: {id: 3, value: 7}, AE: {id: 4, value: 3}, JE: {id: 5, value: 1} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:3,
      name: 'CE Ayodhya',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 3}, EE: {id: 3, value: 5}, AE: {id: 4, value: 3}, JE: {id: 5, value: 10} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 2}, EE: {id: 3, value: 8}, AE: {id: 4, value: 5}, JE: {id: 5, value: 2} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 3}, EE: {id: 3, value: 5}, AE: {id: 4, value: 3}, JE: {id: 5, value: 10} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 6}, EE: {id: 3, value: 2}, AE: {id: 4, value: 8}, JE: {id: 5, value: 2} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        status: 'Online',
        gps: 'On',
        address: ''
      }
    },
  ];
  isPrevious: boolean = false;
  
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

  onGetUserBeasedOnId(id:any,data:any) {
    this.isPrevious = true;
    
    if(id?.id == 2) {
      this.trackingData = SE_DATA
    } else if(id?.id == 3) {
      this.trackingData = EE_DATA
    } else if(id?.id == 4) {
      this.trackingData = AE_DATA
    } else if(id?.id == 5) {
      this.trackingData = JE_DATA
    }
  }

  previousCard() {
    this.isPrevious = false
   this.trackingData= [];
   this.trackingData = [
    {
      colorId:1,
      name: 'CE Agra',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 1}, EE: {id: 3, value: 2}, AE: {id: 4, value: 6}, JE: {id: 5, value: 4} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:2,
      name: 'CE Aligarh',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 6}, EE: {id: 3, value: 7}, AE: {id: 4, value: 3}, JE: {id: 5, value: 1} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:3,
      name: 'CE Ayodhya',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 3}, EE: {id: 3, value: 5}, AE: {id: 4, value: 3}, JE: {id: 5, value: 10} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 2}, EE: {id: 3, value: 8}, AE: {id: 4, value: 5}, JE: {id: 5, value: 2} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 3}, EE: {id: 3, value: 5}, AE: {id: 4, value: 3}, JE: {id: 5, value: 10} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        gps: 'On',
        status: 'Online',
        address: ''
      }
    },
    {
      colorId:4,
      name: 'CE Lucknow',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      active: true,
      stats: { SE: {id: 2, value: 6}, EE: {id: 3, value: 2}, AE: {id: 4, value: 8}, JE: {id: 5, value: 2} },
      timer: '00h 00m',
      details: {
        mobile: '1234567890',
        status: 'Online',
        gps: 'On',
        address: ''
      }
    },
  ]
  }
}
