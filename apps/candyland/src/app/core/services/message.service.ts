import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class MsgService {
    public message: string;
    public actionButtonLabel: string = 'x';
    public action: boolean = true;
    public setAutoHide: boolean = true;
    public autoHide: number = 2000;
    public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    public addExtraClass: boolean = false;

    constructor(private snackBar: MatSnackBar) { }

    public showSnackBar(message: string, action?: string, config?: MatSnackBarConfig): void {
        this.actionButtonLabel = action ? action : this.actionButtonLabel;
        const matSnackBarConfig = new MatSnackBarConfig();
        matSnackBarConfig.verticalPosition = (config && config.verticalPosition) ? config.verticalPosition : this.verticalPosition;
        matSnackBarConfig.horizontalPosition = (config && config.horizontalPosition) ? config.horizontalPosition : this.horizontalPosition;
        matSnackBarConfig.duration = this.setAutoHide ? this.autoHide : 0;
        matSnackBarConfig.panelClass = this.addExtraClass ? ['test'] : undefined;

        this.snackBar.open(message, this.actionButtonLabel, matSnackBarConfig);
    }
}
