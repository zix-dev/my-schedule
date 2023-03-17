import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss']
})
export class ColorBoxComponent {
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
  @Input() public value: string = '';
  /**
  * Emits when value is changed
  */
  @Output() public readonly valueChange = new EventEmitter<string>();
}
