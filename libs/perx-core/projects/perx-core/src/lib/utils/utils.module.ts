import { NgModule } from '@angular/core';
import { NumericCharacterDirective } from './numeric-character.directive';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification/notification.service';

@NgModule({
    declarations: [
        NumericCharacterDirective,
        PopupComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        NumericCharacterDirective,
        PopupComponent
    ],
    providers: [
        NotificationService
    ]
})
export class UtilsModule { }
