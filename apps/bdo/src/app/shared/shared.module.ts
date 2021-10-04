import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LargeListItemComponent } from './components/large-list-item/large-list-item.component';


@NgModule({
    declarations: [
        ListItemComponent,
        LargeListItemComponent
    ],
    imports: [ CommonModule ],
    exports: [
        ListItemComponent,
        LargeListItemComponent
    ],
    providers: [],
})
export class SharedModule {}
