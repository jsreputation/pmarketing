import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LeaderboardListComponent } from './leaderboard-list.component';

describe('LeaderboardListComponent', () => {
  let component: LeaderboardListComponent;
  let fixture: ComponentFixture<LeaderboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardListComponent],
      imports: [MatCardModule, TranslateModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
