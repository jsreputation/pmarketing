import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { CatalogPageComponent } from './catalog-page.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { SortComponent } from './sort/sort.component';
import { CategoryComponent } from './category/category.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchResultComponent } from '../../shared/components/search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LargeListItemComponent } from '../../shared/components/large-list-item/large-list-item.component';
import { ListItemComponent} from '../../shared/components/list-item/list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CatalogPageComponent,
        CategoryHeaderComponent,
        SortComponent,
        CategoryComponent,
        SearchResultComponent,
        TaggedItemComponent,
        LargeListItemComponent,
        ListItemComponent
      ],
      imports: [
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        MatTabsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    window.history.pushState({ categoryCode: 'cardExclusives',subCategoryCodeSelected:[]}, '', '');
    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
