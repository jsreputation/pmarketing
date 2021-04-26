import { LocationModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindLocationComponent } from './find-location.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [FindLocationComponent],
  exports: [FindLocationComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTabsModule,
    LocationModule,
    TranslateModule.forChild(),
  ]
})
export class FindLocationModule { }
