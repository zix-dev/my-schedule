import { DialogConfig } from './../../services/popup.service';
import { ButtonType } from './../btn/btn.component';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfig
  ) {}
}

export type ButtonConfig = {
  type?: ButtonType;
  text?: string;
  icon?: string;
};
