import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @HostBinding('style.--width') @Input() public width: string = '400px';
  @HostBinding('class.opened') @Input() public opened: boolean = false;

}
