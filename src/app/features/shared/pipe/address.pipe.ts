import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AreaAllotDetailsPopupComponent } from '../../admin/admin-dashboard-manage/components/area-allot-details-popup/area-allot-details-popup.component';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  constructor(private component: AreaAllotDetailsPopupComponent) {}

  transform(lat: number, lng: number): Observable<string> {
    if (!lat || !lng) {
      return of('NA');
    }
    return this.component.getAddress(lat, lng);
  }
}