import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-area-google-map',
  templateUrl: './area-google-map.component.html',
  styleUrl: './area-google-map.component.scss'
})
export class AreaGoogleMapComponent {
  @Output() mapAddress = new EventEmitter();
  @Input() colour:any
  map!: google.maps.Map;
  sourceMarker: google.maps.Marker | null = null;
  destinationMarker: google.maps.Marker | null = null;
  circle: google.maps.Circle | null = null;
  polyline: google.maps.Polyline | null = null;
  polygon: google.maps.Polygon | any;
  drawingManager!: google.maps.drawing.DrawingManager;

  @Input() markerData: any;
  mapType: any;
  mapData: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private modalService: BsModalService,
    private mapService: MapService
  ) {}

  ngAfterViewInit() {    
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap().then(() => {
        if (this.mapType == 'show on Map') {
          this.formatMapData(this.mapData);
        }
      });
    }
  }

  async initializeMap(): Promise<void> {
    this.map = new google.maps.Map(document.getElementById('area_map') as HTMLElement, {
      center: { lat: 28.6139, lng: 77.2088 },
      zoom: 6,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_TOP,
        mapTypeIds: ['roadmap', 'satellite'],
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYLINE
        ],
      },
      circleOptions: {
        fillColor: this.colour || 'blue',
        fillOpacity: 0.2,
        strokeWeight: 2,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
      polylineOptions: {
        strokeColor: this.colour || 'black',
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
      },
    });

    this.drawingManager.setMap(this.map);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      this.clearMap();
      if (event.type === 'circle') {
        this.circle = event.overlay;
        this.updateShapeDetails(this.circle, 'circle', 'Add');
      } else if (event.type === 'polyline') {
        this.polyline = event.overlay;
        this.updateShapeDetails(this.polyline, 'polyline', 'Add');
      }
    });

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      if (event.type === 'circle') {
        this.updateShapeDetails(event.overlay, 'circle', 'Update');
      } else if (event.type === 'polyline') {
        this.updateShapeDetails(event.overlay, 'polyline', 'Update');
      }
    });
  }

  handleRemovedLayer(layer: any): void {
    if (layer instanceof google.maps.Circle) {
      this.mapAddress.emit({ circle: '', radius: '', shapeType: 1 });
    } else if (layer instanceof google.maps.Polyline) {
      this.mapAddress.emit({ circle: '', radius: '', shapeType: 2 });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['markerData'] && this.markerData) {
      this.updateMarkersAndFitBounds();
    }
    if (changes['colour'] && this.colour) {
      // Update drawing manager options with new color
      if (this.drawingManager) {
        const circleOptions = {
          ...this.drawingManager.get('circleOptions'),
          fillColor: this.colour,
          strokeColor: this.colour
        };
        const polylineOptions = {
          ...this.drawingManager.get('polylineOptions'),
          strokeColor: this.colour
        };
        
        this.drawingManager.setOptions({
          circleOptions: circleOptions,
          polylineOptions: polylineOptions
        });
      }
      
      // Update existing shapes with new color
      if (this.circle) {
        this.circle.setOptions({
          strokeColor: this.colour,
          fillColor: this.colour
        });
      }
      if (this.polyline) {
        this.polyline.setOptions({
          strokeColor: this.colour
        });
      }
    }
  }

  clearMap() {
    if (this.circle) {
      this.circle.setMap(null);
      this.circle = null;
    }
    if (this.polygon) {
      this.polygon.setMap(null);
      this.polygon = null;
    }

    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = null;
    }
  }

  updateMarkersAndFitBounds(): void {
    if (!this.map) {
      console.error('Map is not initialized yet.');
      return;
    }

    const bounds = new google.maps.LatLngBounds();

    if (this.sourceMarker) {
      this.sourceMarker.setMap(null);
    }
    if (this.destinationMarker) {
      this.destinationMarker.setMap(null);
    }
    if (this.circle) {
      this.circle.setMap(null);
    }
    if (this.polyline) {
      this.polyline.setMap(null);
    }
    if (this.polygon) {
      this.polygon.setMap(null);
    }

    if (this.markerData?.sourceLat && this.markerData?.sourceLon) {
      this.sourceMarker = new google.maps.Marker({
        position: { lat: this.markerData.sourceLat, lng: this.markerData.sourceLon },
        map: this.map,
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      });
      bounds.extend(this.sourceMarker.getPosition()!);
    }

    if (this.markerData?.destinationLat && this.markerData?.destinationLon) {
      this.destinationMarker = new google.maps.Marker({
        position: { lat: this.markerData.destinationLat, lng: this.markerData.destinationLon },
        map: this.map,
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      });
      bounds.extend(this.destinationMarker.getPosition()!);
    }

    if (this.markerData?.shape === '1' && this.markerData?.radius) {
      this.circle = new google.maps.Circle({
        map: this.map,
        center: { lat: this.markerData.sourceLat, lng: this.markerData.sourceLon },
        radius: +this.markerData.radius,
        strokeColor: this.markerData.colour || this.colour || 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: this.markerData.colour || this.colour || 'blue',
        fillOpacity: 0.2,
      });
      bounds.union(this.circle.getBounds()!);
    } else if (this.markerData?.shape === '2') {
      if(this.markerData?.geofanceText) {
        const coordinates = this.markerData?.geofanceText ? JSON.parse(this.markerData?.geofanceText) : [];
        const path = coordinates?.map((coord: [number, number]) => ({
          lat: coord[1],
          lng: coord[0],
        }));
    
        this.polyline = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: this.markerData.colour || this.colour || 'black',
          strokeOpacity: 0.8,
          strokeWeight: 5,
        });
        this.polyline.setMap(this.map);    
        path?.forEach((point: google.maps.LatLngLiteral) => bounds.extend(point));
      } else {
        const path = [
          { lat: this.markerData.sourceLat, lng: this.markerData.sourceLon },
          { lat: this.markerData.destinationLat, lng: this.markerData.destinationLon }
        ];

        this.polyline = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: this.colour || 'black',
          strokeOpacity: 0.8,
          strokeWeight: 5,
        });
        this.polyline.setMap(this.map);
        
        path.forEach((point: google.maps.LatLngLiteral) => bounds.extend(point));
      }
    }

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
    }
  }

  updateShapeDetails(layer: any, type: string, action: string) {
    if (type === 'circle') {
      let center = layer.getCenter();
      const radius = Math.round(layer.getRadius());
      center = {
        lat: center.lat(),
        lng: center.lng()
      }      
      this.mapAddress.emit({ circle: center, radius: radius, shapeType: 1 });
    } else if (type === 'polyline') {            
      const path = layer.getPath().getArray();                  
      const coordinates = path.map((latLng: google.maps.LatLng) => [latLng.lat(), latLng.lng()]);
      this.mapAddress.emit({ circle: coordinates, radius: 0, shapeType: 2 });
    }
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
      geofanceText: mapData.geofence_text,
    };

    this.markerData = shapeData;
    if (this.markerData && this.map) {
      this.updateMarkersAndFitBounds();
    }
  }
}