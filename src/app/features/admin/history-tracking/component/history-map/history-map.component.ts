import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'history-map',
  templateUrl: './history-map.component.html',
  styleUrl: './history-map.component.scss'
})
export class HistoryMapComponent {
  breadcrumbs = [
    { label: 'Home', path: '/admin/dashboard/home' },
    { label: 'History', path: '/admin/history/play-back' },
  ];
  historylist:any;
  isPlaying:boolean= false;
  sliderValue: number = 0;
  speed = [
    { id: 1, value: '1x' },
    { id: 2, value: '2x' },
    { id: 4, value: '3x' },
    { id: 16, value: '4x' },
    { id: 32, value: '5x' }
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

    // Initialize the map with specified center and zoom level
    this.map = L.map('history_map', {
      center: [28.6139, 77.2088],
      zoom: 6
    });

    const mapElement = document.getElementById('history_map');
    if (mapElement) {
      mapElement.style.zIndex = '100'; // Adjust the z-index as needed
    }

    // Define the base layers
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
    }).addTo(this.map); // Add Google layer to the map to set it as default

    // Create an object for base layers
    const baseMaps = {
      "Google Map": googleLayer, // Google Map as the default layer
      "OpenStreetMap": osmLayer,
      "Satellite": satelliteLayer
    };

    // Add layers control to the map
    L.control.layers(baseMaps).addTo(this.map);

  }

  togglePlayPause(event: any): void {
    this.isPlaying = !this.isPlaying;
  }
}
