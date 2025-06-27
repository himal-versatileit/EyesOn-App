import { Injectable, inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SecureStorageService } from "../services";
import { SESSION_KEYS } from "../models";

@Injectable({
  providedIn: "root",
})
export class UnAuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly secureStorage = inject(SecureStorageService);

  constructor() {}

  async canActivate(): Promise<boolean> {
    const token = await this.secureStorage.getStorage(SESSION_KEYS.TOKEN);
    if (!token) {
      return true;
    }

    this.router.navigate(["/dashboard"]);
    return false;
  }
}
