import { Component } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrl: './zone-list.component.scss'
})
export class ZoneListComponent {
  zoneList: any;

  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Master', path: '/admin/master/zone-master' },
    { label: 'Zone Master', path: '/admin/master/zone-master' }
  ];
  
  constructor(
    private commonService: CommonService,
  ) { };

  ngOnInit() {
    this.getZoneList()
  }

  getZoneList() {
    this.commonService.zoneList().subscribe(
      data => {
        this.zoneList = data?.body?.result
      },
    );
  }

}
