import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestComponent, QuestModule as BCPQuestModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: '',
    component: QuestComponent
  }
];

@NgModule({
  imports: [
    BCPQuestModule,
    RouterModule.forChild(routes)
  ]
})
export class QuestModule { }
