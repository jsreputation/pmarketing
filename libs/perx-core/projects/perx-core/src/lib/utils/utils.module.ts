import { NgModule } from '@angular/core';
import { NumericCharacterDirective } from './numeric-character.directive';

@NgModule({
    declarations: [
        NumericCharacterDirective
    ],
    exports: [
        NumericCharacterDirective
    ]
})
export class UtilsModule { }
