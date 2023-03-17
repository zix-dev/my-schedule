import { PopupService } from './../../../basic/services/popup.service';
import { GeneralConfig } from './../../models/configurations.models';
import { DatabaseService } from './../../../../database.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.scss']
})
export class GeneralConfigurationComponent implements OnDestroy {
  public config?: GeneralConfig;
  public s: string = 'rwouncoèfcwm';
  private _subs: Subscription[] = []
  public constructor(private _db: DatabaseService) {
    this._subs.push(this._db.get<GeneralConfig>('generalConfig').subscribe(result => {
      if (result.length == 0) this.config = undefined
    }));
  }
  public ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  public test(a: any) {
    console.log(a);

  }
}
