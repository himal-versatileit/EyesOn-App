import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private count: number = 0;
  private spinner$ = new BehaviorSubject<string>("");

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next("start");
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next("stop");
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next("stop");
  }

  get loadingCount(): number {
    return this.count;
  }

  get loadingStatus(): boolean {
    return this.spinner$.value === "start";
  }

  //#endregion
}
