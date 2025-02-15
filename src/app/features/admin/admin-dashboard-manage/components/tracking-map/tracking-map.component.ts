import { Component, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tracking-map',
  templateUrl: './tracking-map.component.html',
  styleUrl: './tracking-map.component.scss'
})
export class TrackingMapComponent {
  @Input() allUserList: any;
  @Input() isLoading: any;
  map!: L.Map;
  markerLayer!: L.LayerGroup;
  ngOnInit() {
    this.initializeMap()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.addUserMarkers()
  }

  initializeMap() {
    const leafletModule = import('leaflet');
    this.map = L.map('map', {
      center: [28.5821, 77.3109],
      zoom: 12,
      zoomControl: false,
    });

    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 21,
      }
    );

    const satelliteLayer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      {
        attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
        maxZoom: 21,
      }
    );

    const googleLayer = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps',
      }
    ).addTo(this.map);

    const baseMaps = {
      'Google Map': googleLayer,
      OpenStreetMap: osmLayer,
      Satellite: satelliteLayer,
    };

    this.markerLayer = L.layerGroup().addTo(this.map);
    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);
  }


  addUserMarkers() {
    this.markerLayer?.clearLayers();  
    const markers: L.Marker[] = [];
  
    this.allUserList?.forEach((user: any) => {      
      const { last_lat, last_long, full_name, user_status, last_loc } = user;
  
      if (last_lat && last_long) {
        const lat = parseFloat(last_lat);
        const lng = parseFloat(last_long);
  
        if (!isNaN(lat) && !isNaN(lng)) {
          const markerIcon = L.icon({
            iconUrl:
              user_status === 'Online'
                ? 'assets/images/rp_marker_person_green.png'
                : 'assets/images/rp_marker_person_red.png',
            iconSize: [30, 60],
          });
  
          const marker = L.marker([lat, lng], { icon: markerIcon }).bindPopup(
            `
            <div class="live-data pl-2 mt-1">
              <div class="row mb-2">
                <div class="col-md-7">
                  <span style="font-size:16px" class="label"><strong>${full_name}</strong></span>
                </div>
                <div class="col-md-5">
                  <span> <strong>Status: </strong> ${user_status}</span>
              </div>              
              <div class="row mb-2">
                  <div class="col-md-12 location-part">
                <span style="color: black" class="label">Address : ${last_loc} </span>
              </div>
            </div>            
            `
          );
  
          marker.addTo(this.markerLayer); 
          markers.push(marker); 
        }
      }
    });
  
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers?.map((m) => m.getLatLng())); 
      this.map.fitBounds(bounds); 
    } else {
      const defaultLatLng = L.latLng(28.5821, 77.3109); 
      this.map?.setView(defaultLatLng, 12); 
    }
  }
  
}
