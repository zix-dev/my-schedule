import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent {
  /**
   * String to show in the box when it's empty
   */
  @Input() public placeholder: string = '';
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
