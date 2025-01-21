import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-in-map',
  templateUrl: './user-in-map.component.html',
  styleUrls: ['./user-in-map.component.scss']
})
export class UserInMapComponent {
  @Output() mapData = new EventEmitter();
  @Output() selectUserConfirm = new EventEmitter();
  @Input() userValue: any;
  @Input() userCountData: any;
  @Input() spinnerLoading :any
  userData: any
  searchKeyword: any;
  loginUser: string | null = null;
  zoneList: any[] = [];
  circleList: any[] = [];
  cityList: any[] = [];

  config = {
    displayKey: 'text',
    search: true,
    height: '300px',
    placeholder: 'Select Zone',
  };
  config1 = { ...this.config, placeholder: 'Select Circle' };
  config2 = { ...this.config, placeholder: 'Select City' };

  liveForm!: FormGroup;
  swiperList: any;

  constructor(private commonService: CommonService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.getUserDetails();
    this.getZoneData();
  }

  private initializeForm() {
    this.liveForm = this.fb.group({
      zone: [null],
      circle: [null],
      city: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userData = this.userValue;
    this.swiperList = this.userCountData;
  }

  private getUserDetails() {
    const user = this.commonService.getUserDetails();
    this.loginUser = user?.full_name || null;
  }

  private emitMapData() {
    this.mapData.emit({
      zone: this.liveForm.get('zone')?.value,
      circle: this.liveForm.get('circle')?.value,
      city: this.liveForm.get('city')?.value,
    });
  }

  getZoneData() {
    this.commonService.zoneList(30).subscribe({
      next: (res: any) => {
        this.zoneList = res?.body?.result || [];
        if (this.zoneList.length === 1) {
          this.liveForm.controls['zone'].setValue(this.zoneList[0]);
          this.getCircleData(this.zoneList[0].value);
        } else {
          this.resetForm(['zone', 'circle', 'city']);
        }
        this.emitMapData();
      },
      error: (err) => console.error('Error fetching zones:', err),
    });
  }

  onChangeZone(event: any) {
    if (event?.value?.value) {
      this.getCircleData(event.value.value);
    } else {
      this.resetForm(['circle', 'city']);
    }
    this.emitMapData();
  }

  private getCircleData(zoneId: any) {
    this.commonService.circleList(zoneId).subscribe({
      next: (res: any) => {
        this.circleList = res?.body?.result || [];
        if (this.circleList.length === 1) {
          this.liveForm.controls['circle'].setValue(this.circleList[0]);
          this.getCityData(this.circleList[0].value);
        } else {
          this.resetForm(['circle', 'city']);
        }
        this.emitMapData();
      },
      error: (err) => console.error('Error fetching circles:', err),
    });
  }

  onChangeCircle(event: any) {
    if (event?.value?.value) {
      this.getCityData(event.value.value);
    } else {
      this.resetForm(['city']);
    }
    this.emitMapData();
  }

  onChangeCity(event: any) {
    this.emitMapData();
  }

  private getCityData(circleId: any) {
    this.commonService.cityList(circleId).subscribe({
      next: (res: any) => {
        this.cityList = res?.body?.result || [];
        if (this.cityList.length === 1) {
          this.liveForm.controls['city'].setValue(this.cityList[0]);
        }
        this.emitMapData();
      },
      error: (err) => console.error('Error fetching cities:', err),
    });
  }

  private resetForm(fields: string[]) {
    fields.forEach((field) => {
      this.liveForm.controls[field]?.setValue(null);
    });
    if (fields.includes('circle')) this.circleList = [];
    if (fields.includes('city')) this.cityList = [];
  }

  getVehicleColor(user: any) {
    if (user?.status_duration === 'Never Connected!') {
      return 'status-0';
    } else {
      return 'status';
    }
  }

  formatVehicleStatusDuration(vehicle: any) {
    const parts = vehicle.status_duration.split(' ');
    if (parts[0] === 'Never') {
      return `${vehicle.status_duration}`
    } else {
      return `${vehicle.status_duration}`
    }
  }

  confirm(event: any) {
    this.userData = [];
    this.userData = event?.data;
    this.selectUserConfirm.emit(event?.data)
  }
}
