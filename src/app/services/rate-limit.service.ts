import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RateLimitService {
  private readonly STORAGE_KEY = 'weatherio_request_count';
  private readonly LAST_RESET_KEY = 'weatherio_last_reset_date';
  private readonly MAX_REQUESTS = 3;

  constructor() {
    this.checkAndResetIfNewMonth();
  }

  canMakeRequest(): boolean {
    this.checkAndResetIfNewMonth();
    const currentCount = this.getRequestCount();
    return currentCount < this.MAX_REQUESTS;
  }

  incrementCounter(): void {
    const currentCount = this.getRequestCount();
    localStorage.setItem(this.STORAGE_KEY, (currentCount + 1).toString());

    // Set initial reset date if not exists
    if (!localStorage.getItem(this.LAST_RESET_KEY)) {
      this.updateResetDate();
    }
  }

  getRemainingRequests(): number {
    this.checkAndResetIfNewMonth();
    const currentCount = this.getRequestCount();
    return Math.max(0, this.MAX_REQUESTS - currentCount);
  }

  private getRequestCount(): number {
    const count = localStorage.getItem(this.STORAGE_KEY);
    return count ? parseInt(count, 10) : 0;
  }

  private checkAndResetIfNewMonth(): void {
    const lastResetDate = localStorage.getItem(this.LAST_RESET_KEY);

    if (!lastResetDate) {
      return; // No reset date set yet, will be set on first increment
    }

    const lastReset = new Date(lastResetDate);
    const now = new Date();

    // Check if we're in a different month or year
    const isNewMonth =
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear();

    if (isNewMonth) {
      this.resetCounter();
      this.updateResetDate();
      console.log('Rate limit reset - New month detected');
    }
  }

  private updateResetDate(): void {
    const now = new Date();
    localStorage.setItem(this.LAST_RESET_KEY, now.toISOString());
  }

  resetCounter(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
