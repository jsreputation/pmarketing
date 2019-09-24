import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FieldsInArrayPipe } from '@cl-shared/pipes/fieldsInArray.pipe';
import {FullnamePipe} from './fullname.pipe';
import {ProfilePhotoPipe} from './profile-photo.pipe';
import {DaysOnGoingPipe} from './daysOnGoing.pipe';
import {UppercaseSplitPipe} from '@cl-shared/pipes/uppercase-split.pipe';

const PIPES = [
  FullnamePipe,
  ProfilePhotoPipe,
  DaysOnGoingPipe,
  UppercaseSplitPipe,
  FieldsInArrayPipe
];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES]
})
export class PipesModule {

}
