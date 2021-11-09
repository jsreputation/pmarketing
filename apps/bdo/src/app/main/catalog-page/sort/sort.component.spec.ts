import { ListItemComponent } from './../../../shared/components/list-item/list-item.component';
import { LargeListItemComponent } from './../../../shared/components/large-list-item/large-list-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { SortComponent } from './sort.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultComponent } from '../../../shared/components/search-result/search-result.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaggedItemComponent } from '../../../shared/components/tagged-item/tagged-item.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SortComponent,
        SearchResultComponent,
        LargeListItemComponent,
        ListItemComponent,
        TaggedItemComponent,
        LargeListItemComponent,
        ListItemComponent
      ],
      imports:[
        BrowserAnimationsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTabsModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
