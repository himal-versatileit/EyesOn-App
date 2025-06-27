import { Injectable, inject } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { SecureStorageService } from "../services";
import { SESSION_KEYS } from "../models";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly secureStorage = inject(SecureStorageService);

  constructor() {}

  async canActivate(): Promise<boolean | UrlTree> {
    const token = await this.secureStorage.getStorage(SESSION_KEYS.TOKEN);
    if (!token) {
      this.secureStorage.clearStorage();
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
