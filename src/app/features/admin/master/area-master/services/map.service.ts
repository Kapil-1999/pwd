import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapData: any = {};

  constructor() {}

  setData(center: any, radius: number, type: number) {
    this.mapData = {
      center,
      radius,
      type
    };
  }

  getData() {
    return this.mapData;
  }
}

