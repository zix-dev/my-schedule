import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent {
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
   * Max legth of the text
   */
  @Input() public maxLength?: number;
  /**
   * Value of the control
   */
  @Input() public value: string = '';
  /**
  * Emits when value is changed
  */
  @Output() public readonly valueChange = new EventEmitter<string>();
}
