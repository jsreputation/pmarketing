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
import { ConfigModule, RewardsService, RewardsModule } from '@perxtech/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SearchNotResultComponent } from './search/search-not-result/search-not-result.component';

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
        SearchNotResultComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        AppRoutingModule,
        MainRoutingModule,
        MatExpansionModule,
        RewardsModule,
        HttpClientModule,
        MatIconModule,
        MatIconModule,
        ConfigModule.forRoot({}),
        RewardsModule.forRoot()
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
