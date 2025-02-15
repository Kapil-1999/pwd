import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import * as L from 'leaflet';
import { LiveTrackingService } from '../../services/live-tracking.service';
import {
  EMPTY,
  from,
  interval,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
  selector: 'live-map-tracking',
  templateUrl: './live-map-tracking.component.html',
  styleUrl: './live-map-tracking.component.scss',
})
export class LiveMapTrackingComponent {
  @Output() onConfirm = new EventEmitter();
  map: L.Map | any;
  subscription: Subscription | any;
  livePayloadValue: any = {
    selectedDesigId: 0,
    zoneId: null,
    circleId: null,
    districtId: null,
  };
  spinnerLoading: boolean = false;
  countdown: number | undefined;
  counter: number = 10;
  counterInterval: any = null;
  userData: any;
  private destroy$ = new Subject<void>();
  selectedStatus: any;
  userOnMapdata: any;
  liveData: any;
  private markers: L.Marker[] = [];
  private infoVehicleWindows: L.Popup[] = [];
  private clickedMarker: L.Marker | any = null;
  userCountData:any
  data: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private liveSrevice: LiveTrackingService,
    private storageService: StorageService,
    private cdr : ChangeDetectorRef
  ) {}

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
      zoom: 6,
    });

    const mapElement = document.getElementById('map_canvas');
    if (mapElement) {
      mapElement.style.zIndex = '100';
    }

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

    L.control.layers(baseMaps).addTo(this.map);
  }

  confirm(event: any) {
    let zone =
      Array.isArray(event.zone) && event.zone.length === 0
        ? null
        : event.zone?.value;

    let circle =
      Array.isArray(event.circle) && event.circle.length === 0
        ? null
        : event.circle?.value;

    let city =
      Array.isArray(event.city) && event.city.length === 0
        ? null
        : event.city?.value;

    const livePayload = {
      selectedDesigId: 0,
      zoneId: zone,
      circleId: circle,
      districtId: city,
    };

    this.livePayloadValue = Object.fromEntries(
      Object.entries(livePayload).filter(([_, value]) => value !== null)
    );
    this.getLiveTracking();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getLiveTracking() {
    this.spinnerLoading = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = timer(0, 10000)
      .pipe(
        tap((value) => {
          this.countdown = value % 10 === 0 ? 0 : 10 - (value % 10);
          this.counter = 10;
          clearInterval(this.counterInterval);
          this.counterInterval = setInterval(() => {
            this.counter--;
          }, 1000);
        }),
        switchMap(() => this.liveSrevice.liveTracking(this.livePayloadValue)),
        tap((res: any) => {
          this.spinnerLoading = false;
          this.data = res?.body?.result || [];
          this.userCountData = res?.body?.result || []
          // this.sendFilteredData();
        }),
        switchMap(() => this.storageService.getItem('status')),
        tap((status: any) => {
          this.selectedStatus = status;
          this.filterout(this.data);
          this.onConfirm.emit(true);
          this.plotVehicleonMap();
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error('Error fetching vehicle data:', error);
          this.spinnerLoading = false;
        }
      );
  }

  filterout(data: any): Observable<any> {
    if (this.selectedStatus === 'Admin') {
      this.userData = data.filter((res: any) => res?.designation_id == 1);
    } else if (this.selectedStatus === 'CE') {
      this.userData = data.filter((res: any) => res?.designation_id == 2);
    } else if (this.selectedStatus === 'SE') {
      this.userData = data.filter((res: any) => res?.designation_id == 3);
    } else if (this.selectedStatus === 'EE') {
      this.userData = data.filter((res: any) => res?.designation_id == 4);
    } else if (this.selectedStatus === 'AE') {
      this.userData = data.filter((res: any) => res?.designation_id == 5);
    } else if (this.selectedStatus === 'JE') {
      this.userData = data.filter((res: any) => res?.designation_id == 6);
    } else if (
      this.selectedStatus === 'All' ||
      this.selectedStatus == undefined ||
      this.selectedStatus == null
    ) {
      this.userData = data;
    }
    this.userOnMapdata =  this.userData;
    return of(this.userOnMapdata);
  }

  plotVehicleonMap() {
    if (this.liveData) {
      return;
    }
    const vehicleObs$ = from(this.userOnMapdata);
    vehicleObs$.pipe(
      switchMap((user: any, index: number) => {
        if (!user || (!user?.latitude && !user?.longitude)) {
          return EMPTY;
        }
        const existingMarkerIndex = this.findExistingMarkerIndex(
          user.full_name
        );
        let previousLat: any, previousLon: any;
        if (existingMarkerIndex !== -1) {
          previousLat = this.markers[existingMarkerIndex].getLatLng().lat;
          previousLon = this.markers[existingMarkerIndex].getLatLng().lng;
        }

        const currentLat = user?.latitude;
        const currentLon = user?.longitude;

        const deltaLat = currentLat - previousLat;
        const deltaLng = currentLon - previousLon;

        let heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
        const canvas = document.createElement('canvas');
        const context: any = canvas.getContext('2d');
        const img = new Image();
        img.src = this.onCheckVehicleDevice(user);

        return new Promise((resolve) => {
          img.onload = () => {
            const canvasWidth = Math.max(img.width, img.height);
            const canvasHeight = canvasWidth;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.translate(canvasWidth / 2, canvasHeight / 2);
            context.rotate((heading * Math.PI) / 180);
            context.drawImage(
              img,
              -img.width / 2,
              -img.height / 2,
              img.width,
              img.height
            );
            context.rotate((-heading * Math.PI) / 180);
            context.translate(-canvasWidth / 2, -canvasHeight / 2);

            const icon = L.icon({
              iconUrl: canvas.toDataURL(),
              iconSize: [40, 40],
              iconAnchor: [20, 20],
            });

            const newPosition = L.latLng(user?.latitude, user?.longitude);
            resolve({ user, icon, newPosition, existingMarkerIndex });
          };
        }).then((data: any) => {
          const { vehicle, icon, newPosition, existingMarkerIndex } = data;
          if (existingMarkerIndex !== -1) {
            this.markers[existingMarkerIndex].setIcon(icon);
            this.markers[existingMarkerIndex].setLatLng(newPosition);
            const popup = this.infoVehicleWindows[existingMarkerIndex];
            if (
              popup &&
              this.clickedMarker === this.markers[existingMarkerIndex]
            ) {
              const clickedMarkerTooltip = this.clickedMarker.getTooltip();
              const clickedMarkerText = clickedMarkerTooltip.getContent();
              const vehicleInfo = this.userOnMapdata.find(
                (vehicle: any) => vehicle?.full_name === clickedMarkerText
              );
              if (vehicleInfo) {
                const initialContent = this.generateInfoWindowContent(vehicle);
                popup.setContent(initialContent).setLatLng(newPosition);
              }
            }
          } else {
            const popup = L.popup();
            this.createMarker(vehicle, index, icon, popup);
            this.infoVehicleWindows.push(popup);
          }
          return Promise.resolve();
        });
      }),
      switchMap(() => interval(10000).pipe(takeUntil(this.destroy$))),
      take(1)
    )  .subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  findExistingMarkerIndex(vehicleNo: string): any {
    return this.markers.findIndex(
      (marker: any) => marker.getTooltip()?.getContent() === vehicleNo
    );
  }

  onCheckVehicleDevice(device: any) {
    return 'assets/images/rp_marker_person_red.png';
  }

  createMarker(vehicle: any, index: number, icon: any, popup: L.Popup) {
    const newPosition = L.latLng(vehicle?.latitude, vehicle?.longitude);
    const marker: any = L.marker(newPosition, {
      icon: icon,
    }).addTo(this.map);

    marker.bindTooltip(`${vehicle?.full_name}`, {
      direction: 'bottom',
      className: 'map-label',
      permanent: true,
    });

    marker.popupManuallyClosed = false;

    popup.on('close', () => {
      marker.popupManuallyClosed = true;
    });

    marker.on('click', () => {
      if (marker.popupManuallyClosed) {
        marker.openPopup();
        marker.popupManuallyClosed = false;
      }
      this.clickedMarker = marker;
      const initialContent = this.generateInfoWindowContent(vehicle);
      popup.setContent(initialContent).setLatLng(newPosition).openOn(this.map);
    });
    // this.addPopupListeners(popup, vehicle);

    this.markers.push(marker);
    const bounds = L.latLngBounds(this.markers.map((m) => m.getLatLng()));
    this.map.fitBounds(bounds);
  }

  generateInfoWindowContent(vehicle: any) {
    return `
      <div>
        <div class="live-data pl-2 mt-1">
          <div class="row mb-2">
            <div class="col-md-7">
              <span style="font-size:16px" class="label">
                <strong>${vehicle?.full_name || 'N/A'}</strong>
              </span>
            </div>
            <div class="col-md-5">
              <span>
                <strong>Designation:</strong> ${
                  vehicle?.designation_name || 'N/A'
                }
              </span>
            </div>
          </div>  
          <div class="row mb-2">
            <div class="col-md-7">
              <span>
                <strong>Date:</strong> ${vehicle?.time_stamp || 'N/A'}
              </span>
            </div>
            <div class="col-md-5">
              <span>
                <strong>Status:</strong> ${vehicle?.status_duration || 'N/A'}
              </span>
            </div>
          </div>  
          <div class="row mb-2">
            <div class="col-md-7">
              <span>
                <strong>Speed:</strong> ${vehicle?.speed || 0} Km/H
              </span>
            </div>
            <div class="col-md-5">
              <span>
                <strong>Day Distance:</strong> ${vehicle?.day_distance || 0} Km
              </span>
            </div>
          </div>  
          <div class="row mb-2">
            <div class="col-md-7">
              <span>
                <strong>Contact No.:</strong> ${vehicle?.mobile_no || 'N/A'}
              </span>
            </div>
          </div>  
          <div class="row mb-2">
            <div class="col-md-12 location-part">
              <span style="color: black" class="label">
                ${vehicle?.location || 'Location not available'}
              </span>
            </div>
          </div>  
        </div>
      </div>`;
  }

  selectUsersPlot(event: any) {}
}
