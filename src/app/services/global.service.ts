import { Injectable } from "@angular/core";
import { AlertController, Platform } from "@ionic/angular";
import { MasterService } from "./master.service";
import { SecureStorageService } from "./secure-storage.service";
import { FileType, SESSION_KEYS } from "../models";
import { Browser } from "@capacitor/browser";
import { RESET_User_Profile_SUCCESS } from "../state-management/profile.action";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  constructor(
    private alertController: AlertController,
    private masterService: MasterService,
    private secureStorage: SecureStorageService,
    private platform: Platform,
    private store: Store,
    private router: Router
  ) {}

  OTP_MESSAGE = (messageFor: string, OTP: number, validFor: string = "15") => `Your one time password for ${messageFor} is ${OTP}. Only valid for ${validFor} min, Thanks You, Team DMC.`;

  generateOTP = (): string => {
    const otp = this.generateRandomValue(true, false, 6);
    if (otp?.charAt(0) === "0" || otp?.length < 6) {
      return this.generateOTP(); // Return the result of the recursive call
    }
    return otp;
  };

  generateRandomValue = (isNumber: boolean, isString: boolean, length: number): string => {
    const numbers: string = "0123456789";
    const alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let s = "";
    if (isNumber && isString) s = `${numbers}${alphabets}`;
    else if (isString) s = alphabets;
    else s = numbers;
    return Array(length)
      .join()
      .split(",")
      .map(function () {
        return s.charAt(Math.floor(Math.random() * s.length));
      })
      .join("");
  };

  refreshComponent(_Router: Router) {
    _Router.routeReuseStrategy.shouldReuseRoute = () => false;
    _Router.onSameUrlNavigation = "reload";
    _Router.navigate([_Router.url]);
  }

  async dynamicAlertController(message: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Ok",
          role: "cancel",
          handler: () => {
            console.log("Confirmation canceled");
          },
        },
      ],
    });

    await alert.present();
  }

  async getCurrentLocationFromStorage() {
    const latitude = await this.secureStorage.getStorage(SESSION_KEYS.LATITUDE);
    const longitude = await this.secureStorage.getStorage(SESSION_KEYS.LONGITUDE);
    let address: string = "";
    if (latitude && longitude) {
      address = await this.masterService.getAddressFromCoordinates(+latitude, +longitude);
    }

    return {
      latitude: latitude,
      longitude: longitude,
      address: address,
    };
  }

  backButtonHandler(callBack: () => void, priority: number = 0) {
    return this.platform.backButton.subscribeWithPriority(priority, callBack);
  }

  getUploadedDocumentType(docType: any) {
    if (docType.includes("image")) {
      return FileType.IMAGE;
    }

    if (docType.includes("pdf")) {
      return FileType.PDF;
    }

    return "";
  }

  openSiteInBrowser = async (url: string) => {
    await Browser.open({ url: url });
  };

  async onSignOut() {
    await this.secureStorage.clearStorage();
    this.store.dispatch(RESET_User_Profile_SUCCESS());
    this.router.navigate(["/"], { replaceUrl: true });
    window.location.reload();
  }

  getLicenseStatus(endDate: string): string {
    if (!endDate) return "Invalid Date";

    const expiryDate = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    if (expiryDate >= today) return "Active License";

    const diffDays = Math.floor((today.getTime() - expiryDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `Expired - ${diffDays} day(s) ago`;
    if (diffDays < 365) return `Expired - ${Math.floor(diffDays / 30)} month(s) ago`;
    return `Expired - ${Math.floor(diffDays / 365)} year(s) ago`;
  }
}
