import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class SecureStorageService {
  constructor() {}

  async setStorage(key: string, value: string): Promise<void> {
    await Preferences.set({
      key: key,
      value: value,
    });
  }

  async getStorage(key: string): Promise<string> {
    const { value } = await Preferences.get({
      key: key,
    });
    return value || "";
  }

  async removeStorage(key: string): Promise<void> {
    await Preferences.remove({
      key: key,
    });
  }

  async clearStorage(): Promise<void> {
    await Preferences.clear();
  }
}
