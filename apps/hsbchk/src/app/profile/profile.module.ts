import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import {MatListModule, MatIconModule, MatFormFieldModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { LuckyDrawComponent } from './lucky-draw/lucky-draw.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    PerxBlackcombPagesModule,
    ProfileRoutingModule,
    TranslateModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [LuckyDrawComponent]
})
export class ProfileModule { }
