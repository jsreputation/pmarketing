import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { ContentContainerComponent } from './ui/content-container/content-container.component';
import { HomeComponent } from './home/containers/home/home.component';

const routes: Routes = [
  {
    path: '', component: ContentContainerComponent, children: [
      {path: '', component: HomeComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
