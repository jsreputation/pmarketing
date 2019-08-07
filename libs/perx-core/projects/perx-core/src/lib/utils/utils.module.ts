import { NgModule } from '@angular/core';
import { NumericCharacterDirective } from './numeric-character.directive';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification/notification.service';
import { DebounceClickDirective } from './debounce-click.directive';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        NumericCharacterDirective,
        DebounceClickDirective,
        PopupComponent,
        PinInputComponent
    ],
    entryComponents: [
        PopupComponent,
        PinInputComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    exports: [
        NumericCharacterDirective,
        DebounceClickDirective,
        PopupComponent,
        PinInputComponent
    ],
    providers: [
        NotificationService
    ]
})
export class UtilsModule { }
