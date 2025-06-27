import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { LoaderService } from "./services/loader.service";
import { AccountService, PlatFormService, SecureStorageService } from "./services";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  public readonly platFormService = inject(PlatFormService);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly loaderService = inject(LoaderService);
  private readonly secureStorage = inject(SecureStorageService);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);

  constructor() {}

  ngOnInit(): void {
    //Spinner Handler
    this.loaderService.getSpinnerObserver().subscribe(status => {
      this.showSpinner = status === "start";
      this.cdRef?.detectChanges();
    });

    // (async () => {
    //   const USER_NAME = await this.secureStorage.getStorage(SESSION_KEYS.USER_NAME);
    //   const PASSWORD = await this.secureStorage.getStorage(SESSION_KEYS.PASSWORD);

    //   if (PASSWORD && USER_NAME) {
    //     this.accountService.login(USER_NAME, PASSWORD);
    //   }
    // })();
  }

  ngAfterViewInit(): void {
    // (async () => {
    //   const loading = await this.loadingCtrl.create({
    //     message: "Loading...",
    //     duration: 3000,
    //     showBackdrop: true,
    //     animated: true,
    //     // spinner: "bubbles",
    //     cssClass: "loading-spinner",
    //     keyboardClose: true,
    //   });
    //   loading.present();
    // })();
  }

  showSpinner: boolean = false;
}
