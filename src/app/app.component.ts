import { Component } from '@angular/core';
import { ConfigService } from './modules/configuration/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public x: boolean = false;
  constructor(public config: ConfigService) { }
}
