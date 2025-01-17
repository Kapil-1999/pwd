import { Component } from '@angular/core';
import * as L from 'leaflet';
import { DashboardService } from '../../service/dashboard.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dashboardData: any;
  constructor(
    private dashboardService : DashboardService
  ){}

  ngOnInit() {
    this.getDashboardCountData()
  }

  getDashboardCountData () {
    this.dashboardService.getDashboardCount().subscribe((res:any) => {
      this.dashboardData =  res?.body?.result || null;
    })
  }
}
