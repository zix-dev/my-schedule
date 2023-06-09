import { Time } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  stringToTime,
  timeToString,
} from 'src/app/modules/common/utils/date-and-time.utils';

@Component({
  selector: 'time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.scss'],
})
export class TimeBoxComponent implements AfterViewInit {
  @ViewChild('input') public input!: ElementRef<HTMLInputElement>;
  /**
   * String to show in the box when it's empty
   */
  @Input() public placeholder: string = '';
  /**
   * Flag to set the component to readonly
   */
  @Input() public readonly: boolean = false;
  /**
   * Flag to set the component to required
   */
  @Input() public required: boolean = false;
  /**
   * Flag to set the component to disabled
   */
  @Input() public disabled: boolean = false;
  /**
   * Value of the control
   */
  private _value?: Time;
  /**
   * value setter
   */
  @Input() public set value(val: Time | undefined) {
    this._value = val;
    this._stringValue = timeToString(val) ?? '';
    this.valueChange.emit(this.value);
  }
  /**
   * Value getter
   */
  public get value(): Time | undefined {
    return this._value;
  }
  /**
   * Value as string
   */
  private _stringValue: string = '';
  /**
   * String value setter
   */
  public set stringValue(val: string) {
    this._stringValue = val;
    this._value = stringToTime(val);
    this.valueChange.emit(this.value);
  }
  /**
   * String value getter
   */
  public get stringValue(): string {
    return this._stringValue;
  }
  /**
   * Emits when value is changed
   */
  @Output() public readonly valueChange = new EventEmitter<Time>();

  public ngAfterViewInit(): void {
    this.input.nativeElement.className =
      this.input.nativeElement.className.replace('mdc-text-field__input', '');
  }
}
