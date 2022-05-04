import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainRoutingModule } from './main-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { SearchNavbarComponent } from './search-navbar/search-navbar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoResultComponent } from './result/no-result/no-result.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfigModule, RewardsService, RewardsModule, RewardsServiceModule } from '@perxtech/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

export class MockRewardService {
  getTrending() {
    return of();
  }

  getSearchHistory() {
    return of();
  }
}
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        SearchNavbarComponent,
        NoResultComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        AppRoutingModule,
        MainRoutingModule,
        MatExpansionModule,
        MatIconModule,
        RewardsModule,
        HttpClientModule,
        MatIconModule,
        MatIconModule,
        ConfigModule.forRoot({}),
        RewardsServiceModule.forRoot()
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        { provide: RewardsService, useClass: MockRewardService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
