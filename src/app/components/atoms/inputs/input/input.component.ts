import { Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LABEL_TEXT, PLACEHOLDER_TEXT } from '../../../../shared/utils/constants/atoms-constants';
import { InputSizes } from '../../../../shared/utils/enums/atoms-values';
@Component({
  selector: 'text-input',  
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }
]
})
export class InputComponent implements ControlValueAccessor {
  @Input() size: InputSizes = InputSizes.NORMAL;
  @Input() label: string = LABEL_TEXT;
  @Input() errorMessage: string = '';

  placeholderText = PLACEHOLDER_TEXT;
  onChange: any = () => { }
  onTouch: any = () => { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  input: string = '';
  writeValue(input: string) {
    this.input = input;
  }
}

