import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsInArrayPipe } from '@cl-shared/pipes/fieldsInArray.pipe';
import { FullnamePipe } from './fullname.pipe';
import { ProfilePhotoPipe } from './profile-photo.pipe';
import { DaysOnGoingPipe } from './daysOnGoing.pipe';
import { UppercaseSplitPipe } from '@cl-shared/pipes/uppercase-split.pipe';
import { EngagementTypePipe } from './engagement-type.pipe';
import { SafePipe } from './safe.pipe';
import { JoinMethodPipePipe } from '@cl-shared/pipes/join-method.pipe';
import {ReplaceSpaceScorePipe} from '@cl-shared/pipes/underscore.pipe';
import {ControlKeyVUploadPipe} from '@cl-shared/pipes/ctrlKeyUpload.pipe';
import {SnakePreviewPipe} from '@cl-shared/pipes/snake-dialog-preview.pipe';

const PIPES = [
  FullnamePipe,
  ProfilePhotoPipe,
  DaysOnGoingPipe,
  UppercaseSplitPipe,
  FieldsInArrayPipe,
  EngagementTypePipe,
  SafePipe,
  JoinMethodPipePipe,
  ReplaceSpaceScorePipe,
  ControlKeyVUploadPipe,
  SnakePreviewPipe
];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES]
})
export class PipesModule {

}
