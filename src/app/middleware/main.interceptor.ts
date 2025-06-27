import { Injectable, inject } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, catchError, finalize, map, throwError } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "../services/loader.service";
import { GlobalService, SecureStorageService, ToastrService } from "../services";
import { SESSION_KEYS } from "../models";
import { environment } from "src/environments/environment";

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly loaderService = inject(LoaderService);
  private readonly toastrService = inject(ToastrService);
  private readonly secureStorage = inject(SecureStorageService);
  private readonly globalService = inject(GlobalService);

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.requestStarted();
    const REQUEST_API = request.url;

    const token = localStorage.getItem(SESSION_KEYS.TOKEN);
    if (token && REQUEST_API.includes(environment.API_URL)) request = request.clone({ headers: request.headers.set("Authorization", "Bearer " + token) });

    return next.handle(request).pipe(
      catchError(error => {
        (async () => {
          const message = error?.error?.message || error?.error?.Message;
          switch (error?.status) {
            case 401:
              this.toastrService.presentToast("Unauthorized", "danger");
              await this.globalService.onSignOut();
              break;
            case 404:
              await this.toastrService.presentToast(message, "warning");
              break;
            default:
              await this.toastrService.presentToast(message, "danger");
          }
        })();
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.requestEnded();
      })
    );
  }
}
