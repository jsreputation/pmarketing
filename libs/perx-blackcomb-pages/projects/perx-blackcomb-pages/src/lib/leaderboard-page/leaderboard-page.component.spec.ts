import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPageComponent } from './leaderboard-page.component';
import { RankModule } from '@perxtech/core';

describe('LeaderboardPageComponent', () => {
  let component: LeaderboardPageComponent;
  let fixture: ComponentFixture<LeaderboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardPageComponent ],
      imports: [ RankModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
