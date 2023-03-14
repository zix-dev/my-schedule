import { TimeRangeSelectorComponent } from './../../../common/components/time-range-selector/time-range-selector.component';
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
  public constructor(private _db: DatabaseService, private _popup: PopupService) {
    this._subs.push(this._db.get<GeneralConfig>('generalConfig').subscribe(result => {
      if (result.length == 0) this.config = undefined
    }));
  }
  public ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
  public l(a: any) {
    console.log(a);

  }
  public openPopup(): void {
    const dialog = this._popup.open(TimeRangeSelectorComponent);
    dialog.afterClosed().subscribe(a => console.log(a));
  }
}
