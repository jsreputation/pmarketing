import { LocationModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindLocationComponent } from './find-location.component';
import { MatToolbarModule, MatCheckboxModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [FindLocationComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatToolbarModule,
    MatCheckboxModule,
    MatTabsModule,
    LocationModule,
    
  ]
})
export class FindLocationModule { }
