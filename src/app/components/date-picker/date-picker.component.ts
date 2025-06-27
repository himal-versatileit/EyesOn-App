import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { Cls_DatePickerProps } from "src/app/models";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class DatePickerComponent {
  private readonly modalCtrl = inject(ModalController);

  constructor() {}

  @Input() data = new Cls_DatePickerProps();
  @Input() presentation: "date" | "datetime" = "date";

  selectedDate: string = "";

  onCancel() {}

  onConfirm() {
    this.modalCtrl.dismiss(this.selectedDate);
  }

  onChangeDate($event: CustomEvent) {
    this.selectedDate = $event.detail?.value;
  }
}
