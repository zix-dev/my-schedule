import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent {
  /**
   * Text in the button
   */
  @Input() public text?: string;
  /**
   * Text in the button
   */
  @Input() public icon?: string;
  /**
   * Sets the color of the button
   */
  @Input() public type: 'primary' | 'normal' | 'warn' = 'normal';
  /**
   * Makes the button non clickable
   */
  @Input() public disabled: boolean = false;
  /**
   * Click event
   */
  @Output() public readonly onClick = new EventEmitter<void>()
  /**
   * Click event
   */
  @Output() public readonly onDblClick = new EventEmitter<void>()
  /**
   * Click event
   */
  @Output() public readonly onRightClick = new EventEmitter<void>()
}
