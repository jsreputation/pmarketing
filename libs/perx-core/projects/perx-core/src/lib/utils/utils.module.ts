import { NgModule } from '@angular/core';
import { NumericCharacterDirective } from './numeric-character.directive';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';

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
    ]
})
export class UtilsModule { }
