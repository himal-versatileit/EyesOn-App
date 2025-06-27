import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class PlatFormService {
  constructor(private platForm: Platform) {}

  get isAndroid() {
    return this.platForm.is("android");
  }

  get isIOS() {
    return this.platForm.is("ios");
  }
}
