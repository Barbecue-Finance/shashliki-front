import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsernameInputComponent),
      multi: true
    }
  ]
})
export class UsernameInputComponent implements OnInit, ControlValueAccessor {

  @Input('phone') isShowingPhone: boolean = false
  @Input('validators') validators: ValidatorFn[] = []
  value: string = ''
  inputForm: FormGroup = new FormGroup({})

  constructor() {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: string): void {
    this.value = value
    this.onChange(this.value)
    this.onTouched()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'input': new FormControl('', this.validators)
    })
  }

  update(): void {
    this.value = this.inputForm.value.input
    this.onChange(this.value)
  }


}
