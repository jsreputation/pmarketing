import { NgModule } from "@angular/core";
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

const components = [
    AccountComponent,
    ContactUsComponent
]

@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [
        RouterModule
    ]
})
export class PagesModule { }
