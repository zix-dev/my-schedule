import { ButtonConfig, DialogComponent } from './../components/dialog/dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private _dialog: MatDialog) { }

  public open<T>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T, unknown> {
    if (config == null) config = {};
    config.maxHeight = config.maxHeight ?? '80vh'
    config.maxWidth = config.maxWidth ?? '80vw'
    config.height = config.height;
    config.width = config.width;
    return this._dialog.open(component, config);
  }

  public openDialog(config: DialogConfig): MatDialogRef<DialogComponent> {
    config.width = undefined;
    config.height = undefined;
    return this.open(DialogComponent, { data: config, height: config.height, width: config.width, disableClose: config.disableClose ?? false })
  }
}

export type DialogConfig = {
  title?: string
  text: string;
  buttons?: ButtonConfig[];
  width?: string;
  height?: string;
  disableClose?: boolean;
}
