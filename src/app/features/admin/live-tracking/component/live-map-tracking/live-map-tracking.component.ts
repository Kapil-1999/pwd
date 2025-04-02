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
  catchError,
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
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/app.reducer';
import {
  setShowUserList,
  setTypeUser,
  setUserCountData,
  setvehicleData,
} from '../../../../../core/app.action';
import {
  setIsShowUserList,
  setSelectedUserArea,
  setSelectedVehicleData,
  setTypeUserOnMap,
} from '../../../../../core/app.selector';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'live-map-tracking',
  templateUrl: './live-map-tracking.component.html',
  styleUrl: './live-map-tracking.component.scss',
})
export class LiveMapTrackingComponent {
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
  selectedStatus: any = 'JE';
  userOnMapdata: any;
  liveData: any;
  private markers: L.Marker[] = [];
  private infoVehicleWindows: L.Popup[] = [];
  private clickedMarker: L.Marker | any = null;
  data: any;
  selctedUser$!: Observable<any>;
  liveCordinateOnmap: any[] = [];
  polyline: L.Polyline | null = null;
  confirmedVehicleId: string | null = null;
  animationRequest: any;
  showUserlist!: Observable<boolean>;
  isShowUserList!: boolean;
  private subs: Subscription[] = [];
  private isDestroyed = false;
  selectArea$!: Observable<any>

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private liveSrevice: LiveTrackingService,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
    private commonServive: CommonService
  ) {
    this.subs.push(
      this.store.select(setSelectedVehicleData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {
          this.liveData = res;
          if (this.liveData) {
            this.getSeletedData();
          }
        }));

    this.subs.push(
      this.store.select(setIsShowUserList)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {         
          this.isShowUserList = res;
        }));

    this.subs.push(
      this.store.select(setTypeUserOnMap)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {          
          if (this.isDestroyed) return;
          if(res) {            
            this.liveData = null; 
            this.selectedStatus = res || 'JE';
            this.clearMap();
            this.store.select(setUserCountData).pipe(take(1)).subscribe((userData: any) => {
              if (userData?.app?.vehicleData.length > 0) {                
                this.userOnMapdata = userData?.app?.vehicleData;                
                this.selectedStatus = res;
                this.plotVehicleonMap();
                this.cdr.detectChanges();
              }
            });
          }
          
                  
        }));

    this.subs.push(
      this.store.select(setSelectedUserArea)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: any) => {          
          this.confirm(res)
        }));

  }

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
    let zone = event?.zone;
    let circle = event?.circle;
    let city = event?.city;
    let livePayload: any;

    livePayload = {
      selectedDesigId: 0,
      zoneId: zone,
      circleId: circle,
      districtId: city,
    };

    this.livePayloadValue = Object.fromEntries(
      Object.entries(livePayload).filter(([_, value]) => value !== null)
    );
    this.data = []
    this.liveData = null;
    this.clearMap();
    this.getLiveTracking();

  }

  ngOnDestroy(): void {
    this.isDestroyed = true;

    this.destroy$.next();
    this.destroy$.complete();

    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];

    if (this.counterInterval) {
      clearInterval(this.counterInterval);
      this.counterInterval = null;
    }

    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
      this.animationRequest = null;
    }

    this.store.dispatch(setvehicleData({ vehicleData: [] }));
    this.store.dispatch(setUserCountData({ userCountData: [] }));
    this.store.dispatch(setShowUserList({ showUserList: true }));
    this.clearMap();
  }

  getLiveTracking() {
    if (this.isDestroyed) return;
    this.spinnerLoading = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = timer(0, 10000).pipe(
      takeUntil(this.destroy$),
      tap((value) => {
        if (this.isDestroyed) return;
        this.countdown = value % 10 === 0 ? 0 : 10 - (value % 10);
        this.counter = 10;
        clearInterval(this.counterInterval);
        this.counterInterval = setInterval(() => {
          if (!this.isDestroyed) {
            this.counter--;
          }
        }, 1000);
      }),
      switchMap(() => {
        if (this.isDestroyed) return EMPTY;
        return this.liveSrevice.liveTracking(this.livePayloadValue);
      }),
      tap((res: any) => {
        if (this.isDestroyed) return;
        this.spinnerLoading = false;
        const uniqueData = Array.from(new Map(
          (res?.body?.result || []).map((item: any) => [item.user_id, item])
        ).values());
        this.data = uniqueData;
        this.store.dispatch(setUserCountData({ userCountData: this.data }));
        this.sendFilteredData();
        this.filterout(this.data);
        this.plotVehicleonMap();
      }),
      catchError(error => {
        if (!this.isDestroyed) {
          console.error('Error fetching vehicle data:', error);
          this.spinnerLoading = false;
        }
        return EMPTY;
      })
    ).subscribe();
    this.subs.push(this.subscription);
  }

  filterout(data: any): Observable<any> {
    if (this.selectedStatus === 'Admin') {
      this.userData = data?.filter((res: any) => res?.designation_id == 1);
    } else if (this.selectedStatus === 'CE') {
      this.userData = data?.filter((res: any) => res?.designation_id == 2);
    } else if (this.selectedStatus === 'SE') {
      this.userData = data?.filter((res: any) => res?.designation_id == 3);
    } else if (this.selectedStatus === 'EE') {
      this.userData = data?.filter((res: any) => res?.designation_id == 4);
    } else if (this.selectedStatus === 'AE') {
      this.userData = data?.filter((res: any) => res?.designation_id == 5);
    } else if (this.selectedStatus === 'JE') {
      this.userData = data?.filter((res: any) => res?.designation_id == 6);
    } else if (
      this.selectedStatus === 'JE' ||
      this.selectedStatus == undefined ||
      this.selectedStatus == null
    ) {
      this.userData = data;
    }
    this.store.dispatch(setvehicleData({ vehicleData: this.userData }));
    this.userOnMapdata = this.userData;
    return of(this.userOnMapdata);

  }

  plotVehicleonMap() {
    if (this.liveData) {
      return;
    }
    const vehicleObs$ = from(this.userOnMapdata);
    vehicleObs$
      .pipe(
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
            const { user, icon, newPosition, existingMarkerIndex } = data;
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
                  const initialContent = this.generateInfoWindowContent(user);
                  popup.setContent(initialContent).setLatLng(newPosition);
                }
              }
            } else {
              const popup = L.popup();
              this.createMarker(user, index, icon, popup);
              this.infoVehicleWindows.push(popup);
            }
            return Promise.resolve();
          });
        }),
        switchMap(() => interval(10000).pipe(takeUntil(this.destroy$))),
        take(1)
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  findExistingMarkerIndex(vehicleNo: string): any {
    return this.markers.findIndex(
      (marker: any) => marker.getTooltip()?.getContent() === vehicleNo
    );
  }

  onCheckVehicleDevice(device: any) {
    if (device?.sub_status === '1') {
      return 'assets/images/rp_marker_person_green.png';
    } else if (
      device?.sub_status === '2' ||
      device?.sub_status === '3' ||
      device?.sub_status === '4'
    ) {
      return 'assets/images/yellow_man.png';
    } else {
      return 'assets/images/rp_marker_person_red.png';
    }
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

    this.markers.push(marker);
    const bounds = L.latLngBounds(this.markers.map((m) => m.getLatLng()));
    this.map.fitBounds(bounds);
  }

  generateInfoWindowContent(vehicle: any) {
    const locationPromise = new Promise(async (resolve) => {
      if (vehicle?.latitude && vehicle?.longitude) {
        try {
          const address = { lat: vehicle.latitude, lng: vehicle.longitude };
          this.commonServive.addressApi(address).subscribe({
            next: (res: any) => {
              const location =
                res?.results[0]?.formatted_address || 'Location not available';
              resolve(location);
            },
            error: () => {
              resolve(vehicle?.location || 'Location not available');
            },
          });
        } catch {
          resolve(vehicle?.location || 'Location not available');
        }
      } else {
        resolve(vehicle?.location || 'Location not available');
      }
    });

    locationPromise.then((location: any) => {
      const locationElement = document.querySelector('.location-part .label');
      if (locationElement) {
        locationElement.textContent = location;
      }
    });

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
                <strong>Designation:</strong> ${vehicle?.designation_name || 'N/A'
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
               ${vehicle?.location || 'Fetching location...'}
              </span>
            </div>
          </div>  
        </div>
      </div>`;
  }

  closeAllInfoWindows() {
    for (const infoWindow of this.infoVehicleWindows) {
      infoWindow.close();
    }
  }

  clearMap() {
    this.closeAllInfoWindows();
    this.liveCordinateOnmap = [];
    if (this.markers && this.markers.length > 0) {
      this.markers.forEach((marker: any) => {
        marker.remove();
      });
    }
    this.markers = [];
    if (this.polyline) {
      this.polyline.remove();
      this.polyline = null;
    }

    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }
    this.animationRequest = null;
    this.confirmedVehicleId = null;
  }

  getSeletedData() {
    this.clearMap();
    if (this.liveData) {
      this.confirmedVehicleId = this.liveData?.user_id;
      this.sendFilteredData();
    }
  }

  sendFilteredData() {
    if (!this.confirmedVehicleId) return;
    let selectedUserId = this.data?.find(
      (user: any) => user?.user_id == this.confirmedVehicleId
    );
    const latestLatLng = L.latLng(
      selectedUserId?.latitude,
      selectedUserId?.longitude
    );
    this.map.setView(latestLatLng, 16);
    const newLocationComing = {
      lat: selectedUserId?.latitude,
      lon: selectedUserId?.longitude,
    };
    this.liveCordinateOnmap.push(newLocationComing);
    this.updateMarker(latestLatLng, selectedUserId);
  }

  updateMarker(latestLatLng: L.LatLng, data: any) {
    const existingMarkerIndex = this.findExistingMarkerIndex(data?.full_name);

    const currentLat = data?.Latitude;
    const currentLon = data?.Longitude;

    let previousLat: number | null = null;
    let previousLon: number | null = null;

    if (existingMarkerIndex !== -1) {
      const prevLatLng = this.markers[existingMarkerIndex].getLatLng();
      previousLat = prevLatLng.lat;
      previousLon = prevLatLng.lng;
    }

    // Calculate heading only if there is a previous position
    let heading = 0;
    if (previousLat !== null && previousLon !== null) {
      const deltaLat = currentLat - previousLat;
      const deltaLng = currentLon - previousLon;
      heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
    }

    const canvas = document.createElement('canvas');
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    const img = new Image();
    img.src = this.onCheckVehicleDevice(data);

    img.onload = () => {
      const canvasSize = Math.max(img.width, img.height);
      canvas.width = canvas.height = canvasSize;

      if (context) {
        context.clearRect(0, 0, canvasSize, canvasSize);
        context.translate(canvasSize / 2, canvasSize / 2);
        context.rotate(((heading || 0) * Math.PI) / 180);
        context.drawImage(
          img,
          -img.width / 2,
          -img.height / 2,
          img.width,
          img.height
        );
        context.resetTransform();
      }

      const icon = L.icon({
        iconUrl: canvas.toDataURL(),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const vehicleLabel = `${data?.full_name}`;
      const markerAnimationDuration = 5000;

      if (existingMarkerIndex !== -1) {
        const marker: any = this.markers[existingMarkerIndex];
        const startLatLng = marker?.getLatLng();
        const startTime = performance.now();

        if (!marker?.popupManuallyClosed) {
          let popup = L.popup();
          popup.setContent(this.generateInfoWindowContent(data));
          popup.setLatLng(latestLatLng);
          // marker?.setPopup(popup);
        }
        if (marker?.getPopup() && marker?.getPopup().isOpen()) {
          marker?.getPopup().setContent(this.generateInfoWindowContent(data));
          marker?.getPopup().setLatLng(latestLatLng);
        }
        const animateMarker = (time: number) => {
          const progress = Math.min(
            (time - startTime) / markerAnimationDuration,
            1
          );
          const intermediateLat =
            startLatLng.lat + (latestLatLng.lat - startLatLng.lat) * progress;
          const intermediateLng =
            startLatLng.lng + (latestLatLng.lng - startLatLng.lng) * progress;

          const intermediateLatLng = L.latLng(intermediateLat, intermediateLng);
          marker?.setLatLng(intermediateLatLng);

          if (this.polyline) {
            const lastPoint: any = this.polyline.getLatLngs().slice(-1)[0];
            if (
              !lastPoint ||
              lastPoint.lat !== intermediateLat ||
              lastPoint.lng !== intermediateLng
            ) {
              this.polyline.addLatLng(intermediateLatLng);
            }
          }

          if (progress < 1) {
            this.animationRequest = requestAnimationFrame(animateMarker);
          } else {
            marker?.setLatLng(latestLatLng);
            this.polyline?.addLatLng(latestLatLng);
          }
        };

        this.animationRequest = requestAnimationFrame(animateMarker);

        marker?.setIcon(icon);
        marker?.bindTooltip(vehicleLabel, {
          permanent: false,
          direction: 'bottom',
          className: 'map-label',
        });
      } else {
        const newMarker: any = L.marker(latestLatLng, { icon });
        newMarker.bindTooltip(vehicleLabel, {
          permanent: false,
          direction: 'bottom',
          className: 'map-label',
        });
        newMarker.addTo(this.map);

        // Polyline logic
        if (!this.polyline) {
          this.polyline = L.polyline([latestLatLng], {
            color: 'green',
            weight: 3,
            opacity: 0.8,
          }).addTo(this.map);
        } else {
          this.polyline.addLatLng(latestLatLng);
        }
        // Popup logic
        const popup = L.popup();
        popup.setContent(this.generateInfoWindowContent(data));
        popup.setLatLng(latestLatLng);
        newMarker.bindPopup(popup).openPopup();

        popup.on('close', () => {
          newMarker.popupManuallyClosed = true;
        });
        newMarker.on('click', () => {
          if (newMarker.popupManuallyClosed) {
            newMarker.openPopup();
            newMarker.popupManuallyClosed = false;
          }
        });
        //this.addPopupListener(popup, data);
        this.markers.push(newMarker);
      }
    };
  }

  closeTab() {
    setTimeout(() => {
      this.store.dispatch(setTypeUser({ typeUser: this.selectedStatus }));
      this.liveData = null;
      this.clearMap();
      this.store.dispatch(setShowUserList({ showUserList: true }));
      this.cdr.detectChanges();
    }, 0);
  }
}
