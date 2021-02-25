import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardAboutComponent } from './leaderboard-about.component';
import { MatDividerModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('LeaderboardAboutComponent', () => {
  let component: LeaderboardAboutComponent;
  let fixture: ComponentFixture<LeaderboardAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardAboutComponent],
      imports: [MatDividerModule],
      providers: [{
        provide: TranslateService,
        useValue: {
          get: () => of()
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
