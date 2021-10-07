import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LargeListItemComponent } from './components/large-list-item/large-list-item.component';
import { TaggedItemComponent } from './components/tagged-item/tagged-item.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        ListItemComponent,
        LargeListItemComponent,
        TaggedItemComponent,
        
    ],
    imports: [ CommonModule, MatIconModule ],
    exports: [
        ListItemComponent,
        LargeListItemComponent,
        TaggedItemComponent
    ],
    providers: [],
})
export class SharedModule {}
