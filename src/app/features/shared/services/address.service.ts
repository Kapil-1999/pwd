import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressCacheService {
  private cache = new Map<string, string>();

  getAddressKey(lat: number, lng: number): string {
    return `${lat},${lng}`;
  }

  getCachedAddress(lat: number, lng: number): string | undefined {
    const key = this.getAddressKey(lat, lng);
    return this.cache.get(key);
  }

  setCachedAddress(lat: number, lng: number, address: string): void {
    const key = this.getAddressKey(lat, lng);
    this.cache.set(key, address);
  }
}