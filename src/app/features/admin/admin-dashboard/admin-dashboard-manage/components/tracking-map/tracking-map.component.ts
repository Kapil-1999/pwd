import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tracking-map',
  templateUrl: './tracking-map.component.html',
  styleUrl: './tracking-map.component.css'
})
export class TrackingMapComponent {
  map!: L.Map;
  markersLayer!: L.LayerGroup;
  lat = 28.6139;
  lng = 77.2090
  zoom = 12;

  ngOnInit(){
    // setTimeout(() => this.initializeMap(this.lat,this.lng,this.zoom), 0);
    this.initializeMap(this.lat,this.lng,this.zoom)
   }

  initializeMap(lat: any, long: any, zoomvalue: any) {
    this.map = L.map('map').setView([lat, long], zoomvalue); // Default to Delhi, adjust as needed
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);
  
      this.markersLayer = L.layerGroup().addTo(this.map);
 }
}
