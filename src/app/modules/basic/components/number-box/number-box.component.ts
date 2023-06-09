import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'number-box',
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss'],
})
export class NumberBoxComponent {
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
   * Minimum value
   */
  @Input() public min?: number;
  /**
   * Maximum value
   */
  @Input() public max?: number;
  /**
   * Value of the control
   */
  @Input() public value?: number;
  /**
   * Emits when value is changed
   */
  @Output() public readonly valueChange = new EventEmitter<number>();
}
