import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullnamePipe} from './fullname.pipe';
import {ProfilePhotoPipe} from './profile-photo.pipe';
import {DaysOnGoingPipe} from './daysOnGoing.pipe';
import {UppercaseSplitPipe} from '@cl-shared/pipes/uppercase-split.pipe';

const PIPES = [
  FullnamePipe,
  ProfilePhotoPipe,
  DaysOnGoingPipe,
  UppercaseSplitPipe
];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES]
})
export class BfPipesModule {

}
