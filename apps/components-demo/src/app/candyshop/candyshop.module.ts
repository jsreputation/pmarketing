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
  ChipListModule,
  TimePickerModule,
  UserModule,
  StatisticsProgressBarModule, ColorPickerModule
} from '@perx/candyshop';
import { MatIconModule } from '@angular/material/icon';
import { UPLOAD_FILE_URL } from '../../../../../libs/perx-candyshop/projects/perx-candyshop/src/lib/upload-file/upload-file.module';
import { CandyshopFileUploaderComponent } from './candyshop-file-uploader/candyshop-file-uploader.component';
import { CandyshopGraphicUploaderComponent } from './candyshop-graphic-uploader/candyshop-graphic-uploader.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CandyshopComponent,
    CandyshopSimpleComponent,
    CandyshopFormsComponent,
    CandyshopMenuComponent,
    CandyshopFileUploaderComponent,
    CandyshopGraphicUploaderComponent
  ],
  providers: [
    {
      provide: UPLOAD_FILE_URL,
      useValue: 'https://api-dev1.uat.whistler.perxtech.io/storage/documents'
    }
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    ItemListModule,
    RoleLabelModule,
    ImagesPreviewModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    UploadGraphicModule.forRoot({}),
    UploadFileModule,
    SidenavModule,
    SidenavMenuModule,
    SmsEditorModule,
    StatusLabelModule,
    ChipListModule,
    TimePickerModule,
    UserModule,
    StatisticsProgressBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    ColorPickerModule
  ]
})
export class CandyshopModule {
}
