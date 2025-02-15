import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(private datePipe: DatePipe) {}
  convertToUTC(dateString: any): Date | null {
    if (!dateString) {
      return null;
    }
  
    const hasTime = dateString.includes('T') && dateString.split('T')[1]?.length > 0;
  
    const dateWithTime = hasTime ? dateString : `${dateString}T23:59:59`;
      const date = new Date(dateWithTime);
    const utcDate = new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    ));
  
    return utcDate;
  }
  
  
}
