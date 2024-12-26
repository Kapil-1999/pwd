import { Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Dashboard', path: '/admin/master/zone-master' },
  ];
}
