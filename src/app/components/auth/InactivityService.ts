
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private inactivityTimeout: any;
  public inactivityDetected = new Subject<void>();

  constructor(private ngZone: NgZone) {
    this.startListening();
  }

  private startListening() {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', () => this.resetTimer());
      document.addEventListener('keypress', () => this.resetTimer());
      this.resetTimer();
    });
  }

  private resetTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
    this.inactivityTimeout = setTimeout(() => {
      this.ngZone.run(() => this.inactivityDetected.next());
    }, 600000);
  }
  public resetInactivityTimer() {
    this.resetTimer(); 
  }
}
