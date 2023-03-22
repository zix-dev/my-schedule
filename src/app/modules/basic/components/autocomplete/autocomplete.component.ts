import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
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
   * List of options
   */
  @Input() public options: string[] = [];
  /**
   * List of options filtered by string
   */
  public filteredOptions: string[] = [];
  /**
   * Emits when value is changed
   */
  @Output() public readonly valueChange = new EventEmitter<string>();
  public ngOnInit(): void {
    this.filterOptions();
  }
  /**
   * Filters the options
   */
  public filterOptions(): void {
    this.filteredOptions = this.options.filter((o) =>
      o.includes(this.value.trim())
    );
  }
}
