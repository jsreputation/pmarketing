import { LocationModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindLocationComponent } from './find-location.component';
import { MatToolbarModule, MatCheckboxModule, MatTabsModule } from '@angular/material';

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
