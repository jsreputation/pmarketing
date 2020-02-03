import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general.component';

const routes: Routes = [
  {
    path: '', component: GeneralComponent, children: [
      { path: '', redirectTo: 'media' },
      { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
      { path: 'tags', loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule) },
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'labels', loadChildren: () => import('./labels/labels.module').then(m => m.LabelsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
