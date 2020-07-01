import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent, ContentModule as BCPContentModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: ContentComponent
}];

@NgModule({
  imports: [
    BCPContentModule,
    RouterModule.forChild(routes)
  ]
})
export class ContentModule { }
