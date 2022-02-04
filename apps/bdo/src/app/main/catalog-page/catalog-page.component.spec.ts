import { MatCardModule } from '@angular/material/card';
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
import { RouterTestingModule } from '@angular/router/testing';
import { ListItemComponent} from '../../shared/components/list-item/list-item.component'
import { SearchResultComponent } from '../../shared/components/search-result/search-result.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterService } from '../../shared/services/filter.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ICampaignService, RewardsService, ConfigService } from '@perxtech/core';
import { of } from 'rxjs';
import { GhostCardComponent } from '../../shared/components/ghosts/card-ghost.component';

describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;
  const rewardsServiceBdo: Partial<RewardsService> = {
    getTrending() {
      return of();
    },
    getSearchHistory() {
      return of();
    },
    getAllCategories() {
      return of();
    },
    getCatalogs() {
      return of();
    }
  };
  const rewardsServiceStub: Partial<RewardsService> = {
    getRewards: () => of()
  };
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of()
  };

  const configServiceStub: Partial<ConfigService > = {
    readAppConfig: () => of()
  };

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
        ListItemComponent,
        GhostCardComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        MatTabsModule,
        RouterTestingModule,
        MatDialogModule,
        MatCardModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        FilterService,
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: RewardsService, useValue:rewardsServiceBdo },
        {provide: ConfigService, useValue: configServiceStub}
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
