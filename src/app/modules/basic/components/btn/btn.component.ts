import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  /**
   * Text in the button
   */
  @Input() public text?: string;
  /**
   * Tooltip of the button
   */
  @Input() public tooltip: string = '';
  /**
   * Text in the button
   */
  @Input() public icon?: string;
  /**
   * Sets the color of the button
   */
  @Input() public type: ButtonType = 'normal';
  /**
   * Makes the button non clickable
   */
  @Input() public disabled: boolean = false;
  /**
   * To set the styling to icon
   */
  @Input() public iconButton: boolean = false;
  /**
   * Click event
   */
  @Output() public readonly onClick = new EventEmitter<void>();
  /**
   * Click event
   */
  @Output() public readonly onDblClick = new EventEmitter<void>();
  /**
   * Click event
   */
  @Output() public readonly onRightClick = new EventEmitter<void>();
}

export type ButtonType = 'primary' | 'normal' | 'warn';
