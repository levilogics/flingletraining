import { Component, Input, OnInit, Self } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() type = 'text';
  control: FormControl = new FormControl();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  onChange: any = (args) => {

  };

  onTouched: any = (args) => {

  };

  writeValue(value: any) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
