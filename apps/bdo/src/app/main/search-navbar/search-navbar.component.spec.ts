import { ConfigModule, RewardsModule, RewardsService } from '@perxtech/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { SearchNavbarComponent } from './search-navbar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { of } from 'rxjs';

export class MockRewardService {
  getTrending() {
    return of();
  }

  getSearchHistory() {
    return of();
  }
}

describe('SearchNavbarComponent', () => {
  let component: SearchNavbarComponent;
  let fixture: ComponentFixture<SearchNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchNavbarComponent],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        RewardsModule,
        ConfigModule.forRoot({}),
        RewardsModule.forRoot()
      ],
      providers: [
        { provide: RewardsService, useClass: MockRewardService },
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
