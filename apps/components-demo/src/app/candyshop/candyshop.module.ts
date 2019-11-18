import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandyshopComponent } from './candyshop.component';
import { CandyshopSimpleComponent } from './candyshop-simple/candyshop-simple.component';
import { CandyshopFormsComponent } from './candyshop-forms/candyshop-forms.component';
import { CandyshopMenuComponent } from './candyshop-menu/candyshop-menu.component';
import { CandyshopRoutingModule } from './candyshop-routing.module';
import {
  ButtonModule,
  CopyLinkModule,
  CustomLineProgressModule,
  DownloadButtonModule,
  DownloadLinkModule,
  InfoHintModule,
  LogoModule,
  ProgressBarModule,
  DatePickerModule,
  RangeDatePickerModule,
  SeparateRangeDatePickerModule,
  InkModule,
  ItemListModule,
  RoleLabelModule,
  ImagesPreviewModule,
  SelectGraphicModule,
  SelectGraphicWrapModule,
  UploadGraphicModule,
  UploadFileModule,
  SidenavModule,
  SidenavMenuModule,
  SmsEditorModule,
  StatusLabelModule,
  TagListModule,
  TimePickerModule,
  UserModule,
  VouchersProgressBarModule
} from '@perx/candyshop';

@NgModule({
  declarations: [
    CandyshopComponent,
    CandyshopSimpleComponent,
    CandyshopFormsComponent,
    CandyshopMenuComponent
  ],
  imports: [
    CommonModule,
    CandyshopRoutingModule,
    ButtonModule,
    CopyLinkModule,
    CustomLineProgressModule,
    DownloadButtonModule,
    DownloadLinkModule,
    InfoHintModule,
    LogoModule,
    ProgressBarModule,
    DatePickerModule,
    RangeDatePickerModule,
    SeparateRangeDatePickerModule,
    InkModule,
    ItemListModule,
    RoleLabelModule,
    ImagesPreviewModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    UploadGraphicModule.forRoot({}),
    UploadFileModule.forRoot({}),
    SidenavModule,
    SidenavMenuModule,
    SmsEditorModule,
    StatusLabelModule,
    TagListModule,
    TimePickerModule,
    UserModule,
    VouchersProgressBarModule
  ]
})
export class CandyshopModule {
}
