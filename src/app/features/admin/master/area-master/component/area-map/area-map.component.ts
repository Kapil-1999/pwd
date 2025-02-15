import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateAreaComponent } from '../create-area/create-area.component';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'area-map',
  templateUrl: './area-map.component.html',
  styleUrls: ['./area-map.component.scss']
})
export class AreaMapComponent {
  @Output() mapAddress = new EventEmitter()
  map: L.Map | any;
  sourceMarker: L.Marker | null = null;
  destinationMarker: L.Marker | null = null;
  circle: L.Circle | null = null;
  polyline: L.Polyline | null = null;
  polygon: L.Polygon | null = null;
  drawControl!: any;
  drawnFeatures = new L.FeatureGroup();

  @Input() markerData: any;
  mapType: any;
  mapData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private modalService: BsModalService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap().then(() => {
        if (this.mapType == 'show on Map') {
          this.formatMapData(this.mapData);
        }
      });
    }
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map('area_map', {
      center: [28.6139, 77.2088],
      zoom: 6,
      zoomControl: false
    });
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
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
    this.map.addLayer(this.drawnFeatures);

    this.drawControl = new (L.Control.Draw as any)({
      position: 'topleft',
      draw: {
        polyline: false,
        polygon: true,
        rectangle: false,
        circle: true,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: this.drawnFeatures,
        remove: true,
      },
    });

    this.map.addControl(this.drawControl);

    this.map.on('draw:created', (e: any) => {
      this.clearMap();
      const layer = e.layer;
      this.drawnFeatures.clearLayers();
      this.drawnFeatures.addLayer(layer);
      this.updateShapeDetails(layer, e.layerType, 'Add');
    });

    this.map.on('draw:edited', (e: any) => {
      e.layers.eachLayer((layer: any) => {
        if (layer instanceof L.Circle) {
          this.updateShapeDetails(layer, 'circle', 'Update');
        } else if (layer instanceof L.Polygon) {
          this.updateShapeDetails(layer, 'polygon', 'Update');
        }
      });
    });

    this.map.on('draw:deleted', (e: any) => {
      e.layers.eachLayer((layer: any) => {
        this.handleRemovedLayer(layer);
      });
    });
  }

  handleRemovedLayer(layer: any): void {
    let removedShapeDetails = null;
    if (layer instanceof L.Circle) {
      const center = layer.getLatLng();
      const radius = layer.getRadius();
      removedShapeDetails = {
        type: 'circle',
        center: center,
        radius: radius,
      };
      this.mapService?.setData("", 0, 1);
      this.mapAddress.emit({ circle: "", radius: '', shapeType: 1 })

    } else if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
      const latLngs = layer.getLatLngs();
      removedShapeDetails = {
        type: layer instanceof L.Rectangle ? 'rectangle' : 'polygon',
        points: latLngs,
      };
      this.mapService?.setData("", 0, 2);
      this.mapAddress.emit({ circle: "", radius: "", shapeType: 2 })

    }

    console.log('Removed Layer Details:', removedShapeDetails);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markerData'] && this.markerData) {
      this.updateMarkersAndFitBounds();
    }
  }

  clearMap() {
    this.drawnFeatures.clearLayers();
    if (this.polygon) {
      this.map.removeLayer(this.polygon);
      this.polygon = null;
    }
  }

  updateMarkersAndFitBounds(): void {
    if (!this.map) {
      console.error('Map is not initialized yet.');
      return;
    }
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
        this.fetchRoute(pointA, pointB, this.markerData?.geofanceText);
      }
    }

    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  fetchRoute(pointA: L.LatLng, pointB: L.LatLng, coordinates: any): void {
    const bounds = L.latLngBounds([]);
    let newCoordinates = JSON.parse(coordinates)
    const latLngs: any = newCoordinates.map((coord: [number, number, number]) =>
      L.latLng(coord[1], coord[0])
    );
    this.polyline = L.polyline(latLngs, { color: this.markerData.colour || 'green' }).addTo(this.map);
    bounds.extend(this.polyline.getBounds());
    latLngs.push(latLngs[0]);
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  close() {
    this.modalService.hide();
  }

  formatMapData(mapData: any) {
    const shapeData = {
      sourceLat: mapData.source_lat,
      sourceLon: mapData.source_lon,
      destinationLat: mapData.destination_lat,
      destinationLon: mapData.destination_lon,
      shape: mapData.shape_type.toString(),
      colour: mapData.color_code,
      radius: mapData.radius,
      geofanceText : mapData.geofence_text
    };

    this.markerData = shapeData;
    if (this.markerData && this.map) {
      this.updateMarkersAndFitBounds();
    }
  }

  updateShapeDetails(layer: any, type: string, action: string) {
    if (type === 'circle') {
      const radius = layer.getRadius();
      const center = layer.getLatLng();
      this.mapAddress.emit({ circle: center, radius: radius, shapeType: 1 })
    } else if (type === 'polygon') {
      const latlngs = layer.getLatLngs()[0];
      const coordinates = latlngs.map((latlng: any) => [latlng.lat, latlng.lng]);
      coordinates.push([latlngs[0].lat, latlngs[0].lng]);
      this.mapAddress.emit({ circle: coordinates, radius: 0, shapeType: 2 })

    }
  }
}