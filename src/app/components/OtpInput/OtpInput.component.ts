import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from "@angular/forms";

function getFormArray(size: number): FormArray {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(new FormControl(""));
  }

  return new FormArray(arr);
}

@Component({
  selector: "app-otp-input",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OtpInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OtpInputComponent,
      multi: true,
    },
  ],
  template: `<div class="input-container">
    <input
      #inputEl
      *ngFor="let input of inputs.controls; let i = index"
      (focus)="handleFocus($event)"
      (blur)="onTouched?.()"
      (keypress)="handleKeyPress($event, i)"
      (input)="handleInput()"
      (keydown)="handleKeyDown($event, i)"
      (paste)="handlePaste($event, i)"
      [formControl]="$any(input)"
      [attr.autocomplete]="i === 0 ? 'one-time-code' : null"
      [type]="inputType"
      [attr.enterkeyhint]="i === inputs.controls.length - 1 ? 'done' : 'enter'"
      (keydown.enter)="onEnter()"
      inputmode="numeric" />
  </div> `,
  styleUrl: "./OtpInput.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements ControlValueAccessor, Validator, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["focusInput"]?.currentValue !== changes["focusInput"]?.previousValue) {
      if (!changes["focusInput"]?.currentValue) return;
      setTimeout(() => this.inputEls.get(0)?.nativeElement.focus());
    }
  }

  @Input()
  set size(size: number) {
    this.inputs = getFormArray(size);
    this.#size = size;
  }

  @Input() focusInput: number = 0;
  @Input() inputType: string = "text";
  @Output() keyboardEnter: EventEmitter<any> = new EventEmitter();

  @ViewChildren("inputEl") inputEls!: QueryList<ElementRef<HTMLInputElement>>;

  #size = 4;
  #scheduledFocus: number | null = null;

  inputs = getFormArray(this.#size);

  onChange?: (value: string) => void;
  onTouched?: () => void;

  writeValue(value: string): void {
    // if (isDevMode() && value?.length) {
    //   throw new Error('Otp input is not supposed to be prefilled with data');
    // }

    // Reset all input values
    this.inputs.setValue(new Array(this.#size).fill(""));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputs.disable();
    } else {
      this.inputs.enable();
    }
  }

  validate(control: AbstractControl<string, string>): ValidationErrors | null {
    if (!control.value || control.value.length < this.#size) {
      return {
        otpInput: "Value is incorrect",
      };
    }

    return null;
  }

  handleKeyDown(e: KeyboardEvent, idx: number) {
    if (e.key === "Backspace" || e.key === "Delete") {
      this.inputs.controls[idx].setValue("");
      if (idx > 0 && this.inputs.controls[idx].value === "") {
        this.#scheduledFocus = idx - 1;
        e.preventDefault(); // Prevent default behavior
        setTimeout(() => this.#focusInput(idx - 1)); // Move focus to the previous input
      }
    }
  }

  onEnter() {
    this.keyboardEnter.emit();
  }

  // Due to iOS/iPadOS Safari bug/special behavior we are forced to
  // schedule focus transition during keypress/keydown event and only
  // after input event happened - execute the transition
  // otherwise inputs don't get their values filled
  handleInput() {
    this.#updateWiredValue();

    if (this.#scheduledFocus != null) {
      this.#focusInput(this.#scheduledFocus);
      this.#scheduledFocus = null;
    }
  }

  handleKeyPress(e: KeyboardEvent, idx: number) {
    const isDigit = /\d/.test(e.key);

    // Safari fires Cmd + V through keyPress event as well
    // so we need to handle it here and let it through
    if (e.key === "v" && e.metaKey) {
      return true;
    }

    if (isDigit && idx + 1 < this.#size) {
      // If user inputs digits & we are not on the last input we want
      // to advance the focus
      this.#scheduledFocus = idx + 1;
    }

    if (isDigit && this.inputs.controls[idx].value) {
      // If user deselects an input which already has a value
      // we want to clear it so that it doesn't have more than 1 digit
      this.inputs.controls[idx].setValue("");
    }

    return isDigit;
  }

  handlePaste(e: ClipboardEvent, idx: number) {
    e.preventDefault();

    if (idx !== 0) {
      // If the target input is not the first one - ignore
      return;
    }

    const pasteData = e.clipboardData?.getData("text");
    const regex = new RegExp(`\\d{${this.#size}}`);

    if (!pasteData || !regex.test(pasteData)) {
      // If there is nothing to be pasted or the pasted data does not
      // comply with the required format - ignore the event
      return;
    }

    for (let i = 0; i < pasteData.length; i++) {
      this.inputs.controls[i].setValue(pasteData[i]);
    }

    this.#focusInput(this.inputEls.length - 1);
    this.#updateWiredValue();
    if (this.onTouched) this.onTouched();
  }

  handleFocus(e: FocusEvent) {
    // Select previously entered value to replace with a new input
    (e.target as HTMLInputElement).select();
  }

  #focusInput(idx: number) {
    // In order not to interfere with the input we setTimeout
    // before advancing the focus
    setTimeout(() => this.inputEls.get(idx)?.nativeElement.focus());
  }

  #updateWiredValue() {
    // We want to expose the value as a plain string
    //
    // In order not to interfere with the input we setTimeout
    // before advancing the focus
    setTimeout(() => this.onChange?.(this.inputs.value.join("")));
  }
}
