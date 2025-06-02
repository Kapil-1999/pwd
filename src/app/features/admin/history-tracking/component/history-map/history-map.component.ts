import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HistoryService } from '../../service/history.service';
import { CommonService } from '../../../../shared/services/common.service';
import { catchError, map, Observable, of } from 'rxjs';


@Component({
  selector: 'history-map',
  templateUrl: './history-map.component.html',
  styleUrl: './history-map.component.scss'
})
export class HistoryMapComponent {
  editData: any;
  historylist: any;
  isPlaying: boolean = false;
  sliderValue: number = 0;
  speed = [
    { id: 1, value: '1x' },
    { id: 2, value: '2x' },
    { id: 4, value: '3x' },
    { id: 16, value: '4x' },
    { id: 32, value: '5x' }
  ];
  map: L.Map | any;
  polyline: L.Polyline | null = null;
  startMarker: L.Marker | null = null;
  endMarker: L.Marker | null = null;
  currentIndex: number = 0;
  timeoutId: any;
  moveInterval: number = 1000;
  stepsInSegment: number = 50;
  selectedSpeed: number = 1;
  animatedMarker: L.Marker | any = null;
  isLoading : boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private bsmodService: BsModalService,
    private historyService: HistoryService,
    private commonService: CommonService,
    private dateService : DatePipe
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
    if (this.editData) {
      this.getHistoryData()
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    if (this.animatedMarker) {
      this.map.removeLayer(this.animatedMarker)
      this.animatedMarker = null
    }
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map('history_map', {
      center: [28.6139, 77.2088],
      zoom: 6
    });

    const mapElement = document.getElementById('history_map');
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

  getHistoryData() {
    this.isLoading = true;
    let fromDate: any;
    let toDate: any;
    if (this.editData?.att_date && this.editData?.in_time && this.editData?.out_time) {
      fromDate = this.formatedDate(this.editData?.in_time)
      toDate = this.formatedDate(this.editData?.out_time)
    }
    let payload = {
      "userId": this.editData?.user_id,
      "fromDate": fromDate,
      "toDate": toDate
    }

    this.historyService.historyDataByUser(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.historylist = res?.body?.result || [];
      // this.updatePolyline();
    })
  }

  formatedDate(time: any) {
    const datePart = this.editData.att_date.split(' ')[0];
    const combinedDateTime = `${datePart} ${time}`;
    return combinedDateTime;
  }

  updatePolyline() {
    const path = this.historylist.map((bus: any) => [bus.latitude, bus.longitude]);
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }
    if (this.startMarker) {
      this.map.removeLayer(this.startMarker);
    }
    if (this.endMarker) {
      this.map.removeLayer(this.endMarker);
    }

    this.polyline = L.polyline(path, {
      color: 'blue',
      weight: 2,
      opacity: 2.0,
    }).addTo(this.map);

    const firstLocation = path[0];
    if (firstLocation) {
      const startIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
          <circle cx="12" cy="12" r="6" fill="white"/>
        </svg>`,
        className: 'start-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      this.startMarker = L.marker(firstLocation, { icon: startIcon }).addTo(this.map);
    }

    const lastLocation = path[path.length - 1];
    if (lastLocation) {
      const endIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="10" fill="#FF5252"/>
          <circle cx="12" cy="12" r="6" fill="white"/>
        </svg>`,
        className: 'end-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      this.endMarker = L.marker(lastLocation, { icon: endIcon }).addTo(this.map);
    }

    if (path.length > 0) {
      const bounds = L.latLngBounds(path);
      this.map.fitBounds(bounds);
    }
  }

  close() {
    this.bsmodService.hide();
  }

  togglePlayPause(event: any): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      if (this.currentIndex >= this.historylist.length - 1) {
        this.currentIndex = 0;
      }
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.animateMarker(this.currentIndex);
  }

  pause() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  getLiveAddressLocation(address: any): Observable<any> {
    return this.commonService.getAddressInfoDetail(address).pipe(map((res: any) => res));
  }

  private lastKnownAddress: string = '';
  generateInfoWindowContent(data: any, address: string) {
    const truncateLongWords = (text: string, maxLength: number) => {
      if (!text) return '';
      return text
        .split(' ')
        .map((word) => (word.length > maxLength ? word.substring(0, maxLength) + '...' : word))
        .join(' ');
    };

    if (address && !address.includes('Loading')) {
      this.lastKnownAddress = address;
    }

    const addressToShow = address.includes('Loading') ? (this.lastKnownAddress || 'Address is Loading...') : address;

    const truncatedWordsContent = truncateLongWords(addressToShow || '', 20);
    const processedAddress = truncatedWordsContent.length > 80
      ? truncatedWordsContent.substring(0, 80) + '...'
      : truncatedWordsContent;

    return `
                      <div class="">
                        <div class="live-data pl-2 mt-1">
                          <div class="row mb-2">
                            <div class="col-md-6">
                              <span style="font-size:16px"><strong>${data?.full_name}</strong></span>
                            </div>
                             <div class="col-md-6">
                          <span><strong>speed:</strong> ${data.speed} Km/h</span>          
                          </div>
                          </div>
                        <div class="row mb-2">
                          <div class="col-md-12">
                          <span> <strong>Date:</strong> ${this.dateService.transform(data.time_stamp, 'dd-MM-yyyy HH:mm:ss')}
                          </div>
                         
                        </div>
                        <div class="row mb-2">
                          <div class="col-md-12 location-part">
                            <span style="color: black" class="address"><strong>Location:</strong> ${processedAddress}
                            </span>
                          </div>
                        </div>
                      </div>`;
  }

  routeCoordinates: any[] = [];

  animateMarker(startIndex: number) {
    const path = this.historylist.map((bus: any) => [bus.latitude, bus.longitude]);
    this.routeCoordinates = path;
    if (path.length === 0) return;
    if (path.length > 0) {
      this.map.setView(path[startIndex], 17);
    };
    if (this.animatedMarker) {
      this.map.removeLayer(this.animatedMarker);
    };
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
      this.polyline = null;
    };
    let popupOpened = true;
    let currentIndex = startIndex;
    const steps = path.length - 1;
    const initialLatLng = path[startIndex];
    const vehicleIcon = L.divIcon({
      html: `<img src="${this.onCheckVehicleDevice()}" style="width: 30px; height: 30px;" class="vehicle-icon" />`,
      className: 'vehicle-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
    this.animatedMarker = L.marker(initialLatLng, { icon: vehicleIcon }).addTo(this.map);
    const content = this.generateInfoWindowContent(this.historylist[startIndex], 'Address is Loading...');
    this.animatedMarker.bindPopup(content).openPopup();
    this.animatedMarker.on('popupclose', () => {
      popupOpened = false;
    });
    this.animatedMarker.on('click', () => {
      popupOpened = true;
      const currentLatLng = this.animatedMarker.getLatLng();
      const address = { lat: currentLatLng.lat, lng: currentLatLng.lng };
      const idx = this.currentIndex ?? currentIndex;
      this.animatedMarker.openPopup();
      this.animatedMarker.getPopup().setContent(
        this.generateInfoWindowContent(this.historylist[idx], 'Address is Loading...')
      );
      this.getLiveAddressLocation(address)
        .pipe(
          map((addressValue) =>
            this.generateInfoWindowContent(
              this.historylist[idx],
              addressValue || 'Address not available'
            )
          ),
          catchError(() =>
            of(this.generateInfoWindowContent(this.historylist[idx], 'Address not available'))
          )
        )
        .subscribe((content) => this.animatedMarker.getPopup().setContent(content));
    });
    const animateStep = () => {
      if (!this.isPlaying) return;
      if (currentIndex < path.length - 1) {
        const start = path[currentIndex];
        const end = path[currentIndex + 1];
        const deltaLat = end[0] - start[0];
        const deltaLng = end[1] - start[1];
        const heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
        let stepIndex = 0;
        const moveMarker = () => {
          if (!this.isPlaying) return;
          if (stepIndex <= this.stepsInSegment) {
            const lat = start[0] + (end[0] - start[0]) * (stepIndex / this.stepsInSegment);
            const lng = start[1] + (end[1] - start[1]) * (stepIndex / this.stepsInSegment);
            this.animatedMarker.setLatLng([lat, lng]);
            const iconElement = this.animatedMarker.getElement()?.querySelector('img');
            if (iconElement) {
              (iconElement as HTMLImageElement).style.transform = `rotate(${heading}deg)`;
            };
            const polylinePath = [
              ...path.slice(0, currentIndex + 1),
              [lat, lng]
            ];
            if (this.polyline) {
              this.map.removeLayer(this.polyline);
            };
            this.polyline = L.polyline(polylinePath, {
              color: 'blue',
              weight: 2,
              opacity: 2.0,
            }).addTo(this.map);
            if (stepIndex === 0 && popupOpened) {
              const address = { lat, lng };

              this.animatedMarker.getPopup().setContent(
                this.generateInfoWindowContent(this.historylist[currentIndex], 'Address is Loading...')
              );
              this.getLiveAddressLocation(address)
                .pipe(
                  map((addressValue) =>
                    this.generateInfoWindowContent(
                      this.historylist[currentIndex],
                      addressValue || 'Address not available'
                    )
                  ),
                  catchError(() =>
                    of(this.generateInfoWindowContent(this.historylist[currentIndex], 'Address not available'))
                  )
                )
                .subscribe((content) => this.animatedMarker.getPopup().setContent(content));
            };
            this.map.panTo([lat, lng], {
              animate: true,
              duration: 0.5
            });
            this.sliderValue = currentIndex;
            stepIndex++;
            this.timeoutId = setTimeout(moveMarker, this.moveInterval / this.stepsInSegment);
          } else {
            currentIndex++;
            this.currentIndex = currentIndex;

            if (currentIndex === steps) {
              this.sliderValue = currentIndex;
              this.isPlaying = false;
              return;
            };
            animateStep();
          }
        };
        moveMarker();
      }
    };
    animateStep();
  }

  sliderChange(event: any) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.isPlaying = false;
    const newValue = Number(event.target.value);
    if (newValue >= 0 && newValue < this.historylist.length) {
      this.sliderValue = newValue;
      this.currentIndex = newValue;

      const path = this.historylist.map((bus: any) => [bus.latitude, bus.longitude]);
      if (this.animatedMarker && path[newValue]) {
        this.animatedMarker.setLatLng(path[newValue]);

        this.map.panTo(path[newValue], {
          animate: true,
          duration: 0.5
        });
      }
    }
  }

  onCheckVehicleDevice() {
    return 'assets/images/arrow.png';
  }

  getslidervalue(event: any) {
    this.currentIndex = event;
    this.sliderValue = event;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      if (this.currentIndex >= this.historylist.length - 1) {
        this.currentIndex = 0;
      }
      this.animateMarker(this.currentIndex);
    }
  }

  onSpeedChange(event: any) {
    const speedMultiplier = Number(event.target.value);
    this.moveInterval = 1000 / speedMultiplier;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }
}
