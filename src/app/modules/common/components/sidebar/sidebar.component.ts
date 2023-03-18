import { Component, HostBinding, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @HostBinding('style.--width') @Input() public width: string = '400px';
  @HostBinding('class.opened') @Input() public opened: boolean = false;
  @Output() public readonly beforeClose = new EventEmitter<void>();
  @Output() public readonly beforeOpen = new EventEmitter<void>();
  @Output() public readonly afterClose = new EventEmitter<void>();
  @Output() public readonly afterOpen = new EventEmitter<void>();
  @HostListener('transitionend') private transitionend(): void {
    this.opened ? this.afterOpen.emit() : this.afterClose.emit();
  }
  @HostListener('transitionstart') private transitionstart(): void {
    this.opened ? this.beforeOpen.emit() : this.beforeClose.emit();
  }
}
