import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent {

  @HostBinding('class') @Input() public scroll: 'vertical' | 'horizontal' | 'none' | 'both' = 'vertical';

}
