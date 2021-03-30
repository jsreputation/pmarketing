import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardComponent } from './leaderboard.component';
import { MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardComponent],
      imports: [
        MatTableModule,
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
