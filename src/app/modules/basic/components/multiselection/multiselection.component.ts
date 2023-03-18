import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'multiselection',
  templateUrl: './multiselection.component.html',
  styleUrls: ['./multiselection.component.scss']
})
export class MultiselectionComponent<T> {
  @Input() public options: T[] = [];
  @Input() public selection: T[] = [];
  @Output() public readonly selectionChange = new EventEmitter<T[]>();
  @Input() public customChip?: TemplateRef<HTMLElement>;
  @Input() public customOption?: TemplateRef<HTMLElement>;

  public remove(item: T): void {
    this.selection.splice(this.selection.findIndex(i => i == item), 1);
    this.selection = [...this.selection]
    this.selectionChange.emit()
  }
}
