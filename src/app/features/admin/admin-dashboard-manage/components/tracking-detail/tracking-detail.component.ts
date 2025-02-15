import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IMG_URL } from '../../../../shared/constant/menu/menu';
@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrl: './tracking-detail.component.scss'
})
export class TrackingDetailComponent {
  @Output() mapdata = new EventEmitter()
  @Input() allUserList: any;
  @Input() isLoading: boolean | any;
  activeCardIndex: number | any = null;
  trackingData: any;
  isPrevious: boolean = false;
  searchKeyword:any;
  imgUrl = IMG_URL
  jeshow: boolean = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.trackingData = this.allUserList;
  }

  /**
   * details about user
   * @param index 
   * @param event 
   */
  toggleDetails(index: number, event: Event): void {
    event.preventDefault();
    this.activeCardIndex = this.activeCardIndex === index ? null : index;
  }


  onGetUserBeasedOnId(data: any,id:any) {     
    if(id == 6) {
      this.jeshow = true;
    } else {
      this.jeshow = false;
    }
    this.isPrevious = true;
    this.activeCardIndex = null;
    this.mapdata.emit({
      data: data,
      id: id,
      type: ''
    })
  }

  previousCard() {
    this.isPrevious = false;
    this.jeshow = false;
    this.trackingData = [];
    this.activeCardIndex = null;
    this.mapdata.emit({
      data: {},
      type: 'previous'
    })

  }
}
