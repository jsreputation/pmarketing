import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LargeListItemComponent } from './components/large-list-item/large-list-item.component';
import { TaggedItemComponent } from './components/tagged-item/tagged-item.component';
import { MatIconModule } from '@angular/material/icon';

import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        ListItemComponent,
        LargeListItemComponent,
        TaggedItemComponent,
        SearchResultComponent
        
    ],
    imports: [ CommonModule, MatIconModule , MatTabsModule],
    exports: [
        ListItemComponent,
        LargeListItemComponent,
        TaggedItemComponent,
        SearchResultComponent,
        MatTabsModule
    ],
    providers: [],
})
export class SharedModule {}
