import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SortComponent } from './sort/sort.component';
import { CategoryComponent } from './category/category.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LargeListItemComponent } from '../../shared/components/large-list-item/large-list-item.component';
import { ListItemComponent} from '../../shared/components/list-item/list-item.component'
import { SearchResultComponent } from '../../shared/components/search-result/search-result.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterService } from '../../shared/services/filter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CatalogPageComponent,
        CategoryHeaderComponent,
        CategoryComponent,
        SortComponent,
        SearchResultComponent,
        SortComponent,
        CategoryComponent,
        SearchResultComponent,
        TaggedItemComponent,
        LargeListItemComponent,
        ListItemComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        MatTabsModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        FilterService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
