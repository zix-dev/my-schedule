import { Component } from '@angular/core';
import { ConfigService } from './modules/configuration/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public x: boolean = true;
  constructor(public config: ConfigService) { }
}
