import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  // A HashMap to store the cache. The key is the unique request key and the value is the data.
  private cache = new Map<string, any>();
  // BehaviorSubject that will contain the updated cache data.
  public cache$ = new BehaviorSubject<any>(null);

  // The 'set' method for storing data in the cache.
  set(key: string, data: any): void {
    // Check if data already exists for this key.
    if (this.cache.has(key)) return;

    // If there is no data for this key, we store it in the cache and update the BehaviorSubject.
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key) as any);

    // Save chache for 15 mins then clear it
    setTimeout(() => {
      this.clear(key);
    }, 15 * 60 * 1000);
  }

  // The 'get' method for retrieving data from the cache.
  get(key: string): any {
    // We retrieve the data from the cache and update the BehaviorSubject.
    const data = this.cache.get(key) as any;
    this.cache$.next(data);

    return data;
  }

  // The 'clear' method to clear data from the cache.
  clear(key: string): void {
    // We remove the data from the cache and update the BehaviorSubject.
    this.cache.delete(key);
    this.cache$.next(null);
  }
}
