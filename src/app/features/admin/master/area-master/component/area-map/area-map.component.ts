import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'area-map',
  templateUrl: './area-map.component.html',
  styleUrls: ['./area-map.component.scss']
})
export class AreaMapComponent {
  map: L.Map | any;
  sourceMarker: L.Marker | null = null;
  destinationMarker: L.Marker | null = null;
  circle: L.Circle | null = null;
  polyline: L.Polyline | null = null;  // Variable for polyline
  polygon: L.Polygon | null = null;

  @Input() markerData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map('area_map', {
      center: [28.6139, 77.2088],
      zoom: 6
    });

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    })
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

    L.control.layers(baseMaps).addTo(this.map)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markerData'] && this.markerData) {
      this.updateMarkersAndFitBounds();
    }
  }

  updateMarkersAndFitBounds(): void {
    const bounds = L.latLngBounds([]);
    if (this.sourceMarker) {
      this.map.removeLayer(this.sourceMarker);
    }
    if (this.destinationMarker) {
      this.map.removeLayer(this.destinationMarker);
    }
    if (this.circle) {
      this.map.removeLayer(this.circle);
    }
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }
    if (this.polygon) {
      this.map.removeLayer(this.polygon);
    }
    if (this.markerData?.sourceLat && this.markerData?.sourceLon) {

      this.sourceMarker = L.marker([this.markerData.sourceLat, this.markerData.sourceLon], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }).addTo(this.map);

      bounds.extend([this.markerData.sourceLat, this.markerData.sourceLon]);
    }
    if (this.markerData?.destinationLat && this.markerData?.destinationLon) {
      if (this.destinationMarker) {
        this.map.removeLayer(this.destinationMarker);
      }
      this.destinationMarker = L.marker([this.markerData.destinationLat, this.markerData.destinationLon], {
        icon: L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }).addTo(this.map);
      bounds.extend([this.markerData.destinationLat, this.markerData.destinationLon]);
    }

    if (this.markerData?.shape === '1' && this.markerData?.radius) {
      if (this.circle) {
        this.map.removeLayer(this.circle);
      }
      this.circle = L.circle(
        [this.markerData.sourceLat, this.markerData.sourceLon],
        {
          radius: +this.markerData.radius,
          color: this.markerData.colour || 'blue',
        }
      ).addTo(this.map);

      bounds.extend(this.circle.getBounds());
    } else if (this.markerData?.shape === '2') {
      if ((this.markerData?.sourceLat && this.markerData?.sourceLon) && (this.markerData?.destinationLat && this.markerData?.destinationLon)) {
        const pointA = L.latLng(this.markerData?.sourceLat, this.markerData?.sourceLon);
        const pointB = L.latLng(this.markerData.destinationLat, this.markerData.destinationLon);

        this.fetchRoute(pointA, pointB)
      }
    }


    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }


  fetchRoute(pointA: L.LatLng, pointB: L.LatLng): void {
    console.log("chek", pointA, pointB);
    
    const bounds = L.latLngBounds([]);
    const url = `https://router.project-osrm.org/route/v1/driving/${pointA.lng},${pointA.lat};${pointB.lng},${pointB.lat}?overview=full&geometries=geojson`;

    this.http.get(url).subscribe(
      (response: any) => {
        if (response && response.routes.length > 0) {
          const route = response.routes[0];
          const coordinates = route.geometry.coordinates;
          const latLngs: any = coordinates.map((coord: [number, number]) => L.latLng(coord[1], coord[0]));
          this.polyline = L.polyline(latLngs, { color: this.markerData.colour || 'green' }).addTo(this.map);
          bounds.extend(this.polyline.getBounds());
          latLngs.push(latLngs[0]);
          // this.polygon = L.polygon(latLngs, {
          //   color: this.markerData.colour || 'green',
          //   weight: 2,
          //   fillColor: this.markerData.colour || 'green',
          //   fillOpacity: 0.2,
          // }).addTo(this.map);

          // bounds.extend(this.polygon.getBounds());
          this.map.fitBounds(bounds, { padding: [50, 50] });
        }
      },
    );
  }

}
