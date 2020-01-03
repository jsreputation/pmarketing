import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig
} from '@angular/material';

@Injectable({providedIn: 'root'})
export class MessageService {
  public message: string;
  public actionButtonText: string = 'x';
  public action: boolean = true;
  public setAutoHide: boolean = true;
  public autoHide: number = 2000;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public addExtraClass: boolean = false;

  constructor(private snackBar: MatSnackBar) {
  }

  public show(
    message: string,
    actionType: 'success' | 'danger' | 'warning' | string = 'success',
    duration: number = 2000,
    actionText: string = 'x',
    config?: MatSnackBarConfig
  ): void {
    this.actionButtonText = actionText ? actionText : this.actionButtonText;
    const matSnackBarConfig = new MatSnackBarConfig();
    matSnackBarConfig.verticalPosition = (config && config.verticalPosition) ? config.verticalPosition : this.verticalPosition;
    matSnackBarConfig.horizontalPosition = (config && config.horizontalPosition) ? config.horizontalPosition : this.horizontalPosition;
    matSnackBarConfig.duration = this.setAutoHide ? this.autoHide : 0;
    matSnackBarConfig.panelClass = actionType;
    matSnackBarConfig.duration = duration;

    this.snackBar.open(message, this.actionButtonText, matSnackBarConfig);
  }
}
