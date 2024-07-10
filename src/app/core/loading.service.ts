import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private boolSubject: Subject<boolean> = new Subject<boolean>();
  looding$: Observable<boolean> = this.boolSubject.asObservable();

  loadingOn() {
    this.boolSubject.next(true);
  }
  
  loadingOff() {
    this.boolSubject.next(false);
  }
}
