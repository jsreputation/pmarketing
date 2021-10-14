import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchResultComponent } from '../../shared/components/search-result/search-result.component';
import { SearchComponent } from './search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MainRoutingModule } from '../main-routing.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { RewardsModule, RewardsService } from '@perxtech/core';
import { SearchNotResultComponent } from './search-not-result/search-not-result.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchResultComponent,
        SearchHeaderComponent,
        SearchNotResultComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MainRoutingModule,
        SharedModule,
        MatTabsModule,
        RewardsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        RewardsService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
