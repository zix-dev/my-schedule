import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.scss']
})
export class GeneralConfigurationComponent {
  constructor() { }
  public n?: number;
  public l(a: any) {

    console.log(a);

  }
}
