import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'live-map-tracking',
  templateUrl: './live-map-tracking.component.html',
  styleUrl: './live-map-tracking.component.scss'
})
export class LiveMapTrackingComponent {
  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'Live Tracking', path: '/admin/live/track' },
  ];

  map: L.Map | any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ){}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map('map_canvas', {
      center: [28.6139, 77.2088],
      zoom: 6
    });

    const mapElement = document.getElementById('map_canvas');
    if (mapElement) {
      mapElement.style.zIndex = '100';
    }

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 21
    });

    const satelliteLayer = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
      maxZoom: 21
    });

    const googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 21,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    }).addTo(this.map); 

    const baseMaps = {
      "Google Map": googleLayer, 
      "OpenStreetMap": osmLayer,
      "Satellite": satelliteLayer
    };

    L.control.layers(baseMaps).addTo(this.map);
  }
}
