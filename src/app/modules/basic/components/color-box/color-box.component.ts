import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss'],
})
export class ColorBoxComponent {
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
   * Value of the control
   */
  @Input() public value: string = '';
  /**
   * Emits when value is changed
   */
  @Output() public readonly valueChange = new EventEmitter<string>();
}
