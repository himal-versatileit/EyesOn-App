import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastrService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark") {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: "top",
      color: color,
      swipeGesture: "vertical",
    });

    await toast.present();
  }
}
