import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';

const routes: Routes = [{
  path: '',
  component: ContactUsComponent
}];

@NgModule({
  declarations: [ContactUsComponent],
  imports: [RouterModule.forChild(routes)]
})
export class ContactUsModule { }
