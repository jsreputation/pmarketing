import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoResultComponent } from './no-result.component';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { MainRoutingModule } from '../../main-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SearchResultComponent } from '../../../shared/components/search-result/search-result.component';

describe('NoResultComponent', () => {
  let component: NoResultComponent;
  let fixture: ComponentFixture<NoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NoResultComponent,
        SearchResultComponent,
        SearchHeaderComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        MainRoutingModule,
        SharedModule,
        MatTabsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
