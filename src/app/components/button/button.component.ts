import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "custom-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ButtonComponent {
  constructor() {}

  @Input({ required: true }) name: string = "";
  @Input() isDisabled: boolean = false;
  @Input() isRipple: boolean = false;
  @Input() color: "primary" | "warning" | "success" | "info" | "error" | "gray" | "dark" = "primary";
  @Input() size: "sm" | "md" | "xl" = "md";
  @Input() fill: "outlined" | "filled" = "filled";
  @Input() customClass: string = "";

  @Output() clickEmitter: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.clickEmitter.emit();
  }
}
