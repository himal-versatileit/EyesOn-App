import { Cls_PickerItem } from "src/app/models";
import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "app-selected-picker",
  templateUrl: "./selected-picker.component.html",
  styleUrls: ["./selected-picker.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class SelectedPickerComponent implements OnInit {
  private readonly modalCtrl = inject(ModalController);

  ngOnInit(): void {
    this.onSearchTask();
  }

  searchText: string = "";
  Data: Int_DataItem[] = [];
  @Input() data: any;

  filterList(event: any) {
    const text = event.target.value.trim();

    if (!text) {
      this.data.list?.forEach((item: any) => {
        if (item) {
          item.isFound = true;
        }
      });
    } else {
      this.data.list?.forEach((item: any) => {
        if (item && item.label) {
          item.isFound = item.label.toLowerCase().includes(text.toLowerCase());
        }
      });
    }
  }

  onSearchTask() {
    const searchText = this.searchText?.trim().toLowerCase();

    if (!searchText) {
      this.data.forEach((el: Int_DataItem) => {
        el.isFound = true;
      });
      return;
    }

    this.data.forEach((el: Int_DataItem) => {
      const { Name } = el;
      const found = Name?.toLowerCase().includes(searchText);
      el.isFound = found;
    });
  }

  onChange(item: any, event: any) {
    item.IsChecked = event.detail.checked;
  }

  async onSubmit() {
    let data = this.data.filter((item: any) => item.IsChecked);
    await this.modalCtrl.dismiss(data);
  }

  async onSelectOption(option: Cls_PickerItem) {
    await this.modalCtrl.dismiss(option);
  }

  async onCloseModal() {
    await this.modalCtrl.dismiss();
  }
}

interface Int_DataItem {
  Name: string;
  isFound: boolean;
  IsChecked: boolean;
}
