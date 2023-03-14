import { Time } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { stringToTime, timeToString } from 'src/app/modules/common/utils/date-and-time.utils';

@Component({
  selector: 'time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.scss'],
})
export class TimeBoxComponent {
  /**
   * Hint to show under the box
   */
  @Input() public hint?: string;
  /**
   * String to show in the box when it's empty
   */
  @Input() public placeholder: string = '';
  /**
   * String to show under the box when there is an error
   */
  @Input() public error?: string;
  /**
   * String to show the name of the field above the box
   */
  @Input() public label?: string;
  /**
   * Flag to set the component to readonly
   */
  @Input() public readonly: boolean = false;
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
    this.valueChange.emit(this.value)
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
    this.valueChange.emit(this.value)
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
}
