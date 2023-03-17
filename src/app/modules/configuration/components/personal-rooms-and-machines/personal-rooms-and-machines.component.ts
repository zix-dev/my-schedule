import { ConfigService } from './../../services/config.service';
import { Component } from '@angular/core';

@Component({
  selector: 'personal-rooms-and-machines',
  templateUrl: './personal-rooms-and-machines.component.html',
  styleUrls: ['./personal-rooms-and-machines.component.scss']
})
export class PersonalRoomsAndMachinesComponent {

  public constructor(public config: ConfigService) { }

}
