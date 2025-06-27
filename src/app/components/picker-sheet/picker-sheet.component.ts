import { Cls_PickerItem } from "src/app/models";
import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { Cls_PickerSheerProps } from "src/app/models";

@Component({
  selector: "app-picker-sheet",
  templateUrl: "./picker-sheet.component.html",
  styleUrls: ["./picker-sheet.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class PickerSheetComponent {
  private readonly modalCtrl = inject(ModalController);

  constructor() {}

  @Input() data = new Cls_PickerSheerProps();

  filterList(event: any) {
    const text = event.target.value.trim(); // Trim whitespace from the input

    if (!text) {
      // If search text is empty, reset isFound for all items
      this.data.list?.forEach(item => {
        if (item) {
          // Ensure item exists before accessing its properties
          item.isFound = true;
        }
      });
    } else {
      // Otherwise, update isFound based on the search text
      this.data.list?.forEach(item => {
        if (item && item.label) {
          // Ensure item and label exist before accessing
          item.isFound = item.label.toLowerCase().includes(text.toLowerCase());
        }
      });
    }
  }

  async onSelectOption(option: Cls_PickerItem) {
    await this.modalCtrl.dismiss(option);
  }

  async onCloseModal() {
    await this.modalCtrl.dismiss();
  }
}
