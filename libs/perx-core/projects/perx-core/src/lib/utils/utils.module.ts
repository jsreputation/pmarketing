import { NgModule } from '@angular/core';
import { NumericCharacterDirective } from './numeric-character.directive';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification/notification.service';
import { DebounceClickDirective } from './debounce-click.directive';

@NgModule({
    declarations: [
        NumericCharacterDirective,
        DebounceClickDirective,
        PopupComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        NumericCharacterDirective,
        DebounceClickDirective,
        PopupComponent
    ],
    providers: [
        NotificationService
    ]
})
export class UtilsModule { }
