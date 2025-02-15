import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tracking-map-google',
  templateUrl: './tracking-map-google.component.html',
  styleUrls: ['./tracking-map-google.component.scss']
})
export class TrackingMapGoogleComponent {
  @Input() allUserList: any;
  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allUserList']) {
      this.addUserMarkers();
    }
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 28.5821, lng: 77.3109 },
      zoom: 12,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_TOP,
        mapTypeIds: ['roadmap', 'satellite'],
      },
      zoomControl: true,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });
  }

  addUserMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    if (!this.allUserList) return;

    this.allUserList.forEach((user: any) => {
      const { last_lat, last_long, full_name, user_status, last_loc } = user;

      if (last_lat && last_long) {
        const lat = parseFloat(last_lat);
        const lng = parseFloat(last_long);

        if (!isNaN(lat) && !isNaN(lng)) {
          const iconUrl =
            user_status === 'Online'
              ? 'assets/images/rp_marker_person_green.png'
              : 'assets/images/rp_marker_person_red.png';

          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            icon: {
              url: iconUrl,
              scaledSize: new google.maps.Size(30, 60),
            },
          });

          const infoWindowContent = `
          <div class="custom-info-window">
            <button class="close-button" title="Close">&times;</button>
            <div class="live-data pl-2 mt-1">
              <div class="row mb-2">
                <div class="col-md-7">
                  <span style="font-size:16px;font-weight:500;" class="label"><strong>${full_name}</strong></span>
                </div>
                <div class="col-md-5">
                  <span> <strong style="font-weight:500;">Status: </strong> ${user_status}</span>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-md-12 location-part">
                  <span style="color: black" class="label"><strong style="font-weight:500;">Address: </strong> ${last_loc} </span>
                </div>
              </div>
            </div>
          </div>
        `;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            disableAutoPan: true,
          });

          marker.addListener('click', () => {
            infoWindow.open(this.map, marker);

            setTimeout(() => {
              const closeBtn = document.querySelector('.close-button');
              if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                  infoWindow.close();
                });
              }
            }, 200);
          });

          marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
            setTimeout(() => {
              const closeButton = document.querySelector('.gm-ui-hover-effect');
              if (closeButton) {
                closeButton.remove();
              }
            }, 0);
            setTimeout(() => {
              const closeBtn = document.querySelector('.close-button');
              if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                  infoWindow.close();
                });
              }
            }, 200);
          });


          this.markers.push(marker);
        }
      }
    });

    if (this.markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      this.markers.forEach(marker => bounds.extend(marker.getPosition()!));
      this.map.fitBounds(bounds);
    } else {
      this.map.setCenter({ lat: 28.5821, lng: 77.3109 });
      this.map.setZoom(12);
    }
  }
}
