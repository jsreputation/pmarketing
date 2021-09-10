import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MerchantAdminModule } from '@perxtech/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderComponent],
  exports: [OrderComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MerchantAdminModule,
  ],
})
export class OrderModule { }
