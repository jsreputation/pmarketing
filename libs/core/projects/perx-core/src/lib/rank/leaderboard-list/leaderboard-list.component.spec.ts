import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LeaderboardListComponent } from './leaderboard-list.component';

describe('LeaderboardListComponent', () => {
  let component: LeaderboardListComponent;
  let fixture: ComponentFixture<LeaderboardListComponent>;
  const router = {
    navigate: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardListComponent],
      imports: [MatCardModule, TranslateModule],
      providers: [
        { provide: Router, useValue: router }]
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
