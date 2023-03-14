import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private _dialog: MatDialog) { }

  public open<T>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T, unknown> {
    return this._dialog.open(component, config);
  }
}
