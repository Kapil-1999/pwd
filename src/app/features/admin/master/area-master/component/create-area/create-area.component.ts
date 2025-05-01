import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkService } from '../../../work-master/services/work.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { AreaService } from '../../services/area.service';
import { CommonService } from '../../../../../shared/services/common.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.scss'
})
export class CreateAreaComponent {
  @Output() mapdata = new EventEmitter()

  label: string = 'Create';
  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };
  cityList: any = [];
  workNameList: any = [];
  travelModeList: any;
  status = [
    { id: 1, value: "Active" },
    { id: 0, value: "Inactive" },
  ];
  areaForm!: FormGroup;
  showLocateMarkerMessage = false;
  markerData: any;
  errorMessages: any;
  editData: any
  areaById: any;
  userData: any;
  geofanceText: any = null;

  constructor(
    private modalService: BsModalService,
    private workService: WorkService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private areaService: AreaService,
    private commonService: CommonService,
    private bsModelService: BsModalService,
  ) { }

  ngOnInit() {
    this.userData = this.commonService.getUserDetails();
    this.setInitialValue();
  };

  getTravelList() {
    this.areaService.travelMode().subscribe((res: any) => {
      this.travelModeList = res?.body?.result || [];
    })
  }

  setInitialValue() {
    this.getTravelList();
    this.areaForm = this.fb.group({
      "area_name": [null, [Validators.required]],
      "shape_type": ['2', [Validators.required]],
      "travel_mode": ['Driving', [Validators.required]],
      "color_code": ['black', [Validators.required]],
      "radius": [0],
      "speed_limit": [0],
      "source_lat": [null, [Validators.required]],
      "source_lon": [null, [Validators.required]],
      "destination_lat": [null, [Validators.required]],
      "destination_lon": [null, [Validators.required]],
      "geofence_text": [null],
      "district_id": [null, [Validators.required]],
      "work_id": [null, [Validators.required]],
      "is_active": [1, [Validators.required]],
      "segment_id": [1, [Validators.required]],
      "road_length_geo": [0]
    });
    this.areaForm.get('shape_type')?.valueChanges.subscribe((value) => this.onShapeChange(value));
    this.areaForm.get('shape_type')?.valueChanges.subscribe((shapeType) => {
      if (shapeType == '1') {
        this.updateDestinationCoordinates();
        this.areaForm.get('radius')?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        this.areaForm.get('radius')?.clearValidators();
      }
      this.areaForm.get('radius')?.updateValueAndValidity();
    });

    this.areaForm.get('source_lat')?.valueChanges.subscribe(() => {
      if (this.areaForm.get('shape_type')?.value === '1') {
        this.updateDestinationCoordinates();
      }
    });

    this.areaForm.get('source_lon')?.valueChanges.subscribe(() => {
      if (this.areaForm.get('shape_type')?.value === '1') {
        this.updateDestinationCoordinates();
      }
    });

    if (this.editData) {
      this.label = 'Update'
      this.getAreaById(this.editData?.area_id);

    } else {
      this.getWorkList();
      this.getCityList()
    }
  }


  updateDestinationCoordinates() {
    const sourceLat = this.areaForm.get('source_lat')?.value;
    const sourceLon = this.areaForm.get('source_lon')?.value;

    if (sourceLat !== null || sourceLon !== null) {
      this.areaForm.patchValue({
        destination_lat: sourceLat,
        destination_lon: sourceLon,
      });
    }
  }

  getAreaById(id: any) {
    this.areaService.getAreaById(id).subscribe((res: any) => {
      this.areaById = res?.body?.result;
      console.log("area", this.areaById);
      if (this.areaById) {
        this.areaForm.patchValue({
          "area_name": this.areaById?.area_name,
          "shape_type": this.areaById?.shape_type.toString(),
          "travel_mode": this.areaById?.travel_mode,
          "color_code": this.areaById?.color_code,
          "radius": this.areaById?.radius,
          "speed_limit": this.areaById?.speed_limit,
          "source_lat": this.areaById?.source_lat,
          "source_lon": this.areaById?.source_lon,
          "destination_lat": this.areaById?.destination_lat,
          "destination_lon": this.areaById?.destination_lon,
          "is_active": this.areaById?.is_active,
          "segment_id": this.areaById?.segment_id,
          "road_length_geo": this.areaById?.road_length_geo,
        })
        this.geofanceText = this.areaById?.geofence_text ? JSON.parse(this.areaById?.geofence_text) : null
      }
      this.getWorkList();
      this.getCityList()
      this.onShapeChange(this.areaById?.shape_type.toString())
      this.onCreateShape();
    })
  }

  getWorkList() {
    this.commonService.commonWork().subscribe((res: any) => {
      this.workNameList = res?.body?.result || [];
      if (this.areaById) {
        let workId = this.workNameList.find((val: any) => val.value == this.areaById?.work_id);
        this.areaForm.controls['work_id'].setValue(workId)
      }
    })
  }

  getCityList() {
    this.commonService.cityList(0).subscribe((res: any) => {
      this.cityList = res?.body?.result;

      if (this.areaById) {
        setTimeout(() => {
          let workId = this.cityList.find((val: any) => val.value == this.areaById?.district_id);
          this.areaForm.controls['district_id'].setValue(workId)
        }, 1000);
      }
    })
  }

  onShapeChange(value: string) {
    if (value === '1') {
      const sourceLat = this.areaForm.get('source_lat')?.value;
      const sourceLon = this.areaForm.get('source_lon')?.value;

      if (sourceLat !== null && sourceLon !== null) {
        this.areaForm.patchValue({
          destination_lat: sourceLat,
          destination_lon: sourceLon,
        });
      }
    } else if (value === '2') {
      const sourceLat = this.areaForm.get('source_lat')?.value;
      const sourceLon = this.areaForm.get('source_lon')?.value;
      const destinationLat = this.areaForm.get('destination_lat')?.value;
      const destinationLon = this.areaForm.get('destination_lon')?.value;

      if (sourceLat === destinationLat && sourceLon === destinationLon) {
        this.areaForm.patchValue({
          destination_lat: null,
          destination_lon: null,
        });
      }
    }
  }


  onChangeSourceLon(event: any) {
    const lat = this.areaForm.get('source_lat')?.value;
    const lon = this.areaForm.get('source_lon')?.value;

    if (!lat || !lon) {
      this.notificationService.showInfo('Select Both Source Lat and Source Long for locate the marker on the map')
    };

    this.markerData = {
      sourceLat: this.areaForm.get('source_lat')?.value,
      sourcelon: this.areaForm.get('source_lon')?.value,
      DestinationLat: this.areaForm.get('destination_lat')?.value,
      DestinationLon: this.areaForm.get('destination_lon')?.value,
      shape: this.areaForm.get('shape_type')?.value,
      colour: this.areaForm.get('color_code')?.value
    }
  }


  onChangeDestiantionLon(event: any) {
    const lat = this.areaForm.get('destination_lat')?.value;
    const lon = this.areaForm.get('destination_lon')?.value;

    if (!lat || !lon) {
      this.notificationService.showInfo('Select Both Destination Lat and Destination Long for locate the marker on the map')
    };

    this.markerData = {
      sourceLat: this.areaForm.get('source_lat')?.value,
      sourcelon: this.areaForm.get('source_lon')?.value,
      DestinationLat: this.areaForm.get('destination_lat')?.value,
      DestinationLon: this.areaForm.get('destination_lon')?.value,
      shape: this.areaForm.get('shape_type')?.value,
      colour: this.areaForm.get('color_code')?.value
    }
  }

  onCreateShape() {
    const sourceLat = this.areaForm.get('source_lat')?.value;
    const sourceLon = this.areaForm.get('source_lon')?.value;
    const destinationLat = this.areaForm.get('destination_lat')?.value;
    const destinationLon = this.areaForm.get('destination_lon')?.value;
    const shape = this.areaForm.get('shape_type')?.value;
    const colour = this.areaForm.get('color_code')?.value;
    const radius = this.areaForm.get('radius')?.value;
    const geofanceText = this.areaById?.geofence_text;

    this.areaForm.get('source_lat')?.markAsTouched();
    this.areaForm.get('source_lon')?.markAsTouched();
    this.areaForm.get('destination_lat')?.markAsTouched();
    this.areaForm.get('destination_lon')?.markAsTouched();
    this.areaForm.get('shape_type')?.markAsTouched();

    this.areaForm.get('radius')?.markAsTouched();
    if (!radius || radius <= 0) {
      this.notificationService.showError('Radius is required and must be greater than 0 for circle shape.');
      return;
    }

    if (!sourceLat || !sourceLon || !destinationLat || !destinationLon || !shape) {
      this.notificationService.showError('Please fill in all required fields.');
      return;
    }

    const shapeData = {
      sourceLat,
      sourceLon,
      destinationLat,
      destinationLon,
      shape,
      colour,
      radius,
      geofanceText
    };

    this.markerData = shapeData;
    this.notificationService.showSuccess('Shape created successfully!');
  }

  onCreateRoute(formvalue: any) {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      return;
    }
    if (formvalue?.shape_type == 2) {
      if (!this.geofanceText) {
        this.geofanceText = [
          [formvalue?.source_lon, formvalue?.source_lat, 0.0],
          [formvalue?.destination_lon, formvalue?.destination_lat, 0.0]
        ];
      }
      const distance = this.calculateDistance(formvalue?.source_lat, formvalue?.source_lon, formvalue?.destination_lat, formvalue?.destination_lon);      
      this.areaForm.patchValue({
        road_length_geo: Number(distance.toFixed(2)) 
      });
    }
    let user = this.commonService.getUserDetails()
    let payload = {
      "area_id": 0,
      "area_name": formvalue?.area_name,
      "shape_type": Number(formvalue?.shape_type),
      "travel_mode": formvalue?.travel_mode,
      "color_code": formvalue?.color_code,
      "radius": formvalue?.radius,
      "speed_limit": formvalue?.speed_limit,
      "source_lat": formvalue?.source_lat,
      "source_lon": formvalue?.source_lon,
      "destination_lat": formvalue?.destination_lat,
      "destination_lon": formvalue?.destination_lon,
      "geofence_text": this.geofanceText ? JSON.stringify(this.geofanceText) : null,
      "district_id": formvalue?.district_id ? Number(formvalue?.district_id.value) : null,
      "district_name": formvalue?.district_id ? formvalue?.district_id.text : null,
      "work_id": formvalue?.work_id ? formvalue?.work_id.value : null,
      "work_name": formvalue?.work_id ? formvalue?.work_id.text : null,
      "is_active": formvalue?.is_active,
      "created_by": user?.user_id,
      "segment_id": formvalue?.segment_id == 0 ? 1 : formvalue?.segment_id,
      "road_length_geo": this.areaForm.get('road_length_geo')?.value ? this.areaForm.get('road_length_geo')?.value : 0,
      "road_group": "",
    }

    let service = this.areaService.addArea(payload);
    if (this.areaById) {
      payload['area_id'] = this.areaById?.area_id;
      service = this.areaService.updateArea(payload, this.areaById?.area_id)
    }
    service.subscribe((res: any) => {
      if (res?.status == 200) {
        this.bsModelService.hide();
        this.mapdata.emit();
        this.notificationService.successAlert(res?.body?.actionResponse);
      } else {
        this.notificationService.errorAlert(res?.title);
      }
    });
  }

  close() {
    this.modalService.hide()
  }

  confirm(event: any) {
    const { circle, radius, shapeType } = event;
    this.geofanceText = null
    if (shapeType == 1) {
      this.areaForm.patchValue({
        source_lat: circle.lat,
        source_lon: circle.lng,
        destination_lat: circle.lat,
        destination_lon: circle.lng,
        radius: radius,
        shape_type: shapeType.toString()
      });
    } else if (shapeType == 2) {
      const sourceLat = circle[0][0];
      const sourceLon = circle[0][1];
      const destinationLat = circle[circle.length - 1][0];
      const destinationLon = circle[circle.length - 1][1];
      const distance = this.calculateDistance(sourceLat, sourceLon, destinationLat, destinationLon);
      this.areaForm.patchValue({
        source_lat: sourceLat,
        source_lon: sourceLon,
        destination_lat: destinationLat,
        destination_lon: destinationLon,
        shape_type: shapeType.toString(),
        road_length_geo: Number(distance.toFixed(2))  
      });
      this.geofanceText = circle?.map((coord: any[]) => [coord[1], coord[0], 0.0]);
    }
  }

  private toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
