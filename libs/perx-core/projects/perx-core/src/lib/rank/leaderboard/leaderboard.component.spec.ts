import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponent } from './leaderboard.component';
import {MatTableModule} from '@angular/material';

// const leaderboardRanksStub = [
//   {id: 1, rank: 1, displayName: 'john', value: 1},
//   {id: 1, rank: 2, displayName: 'oliver', value: 1},
//   {id: 1, rank: 3, displayName: 'jimmy', value: 1},
//   {id: 1, rank: 4, displayName: 'kimmel', value: 1},
//   {id: 1, rank: 5, displayName: 'fallon', value: 1},
//   {id: 1, rank: 6, displayName: 'craig', value: 1},
//   {id: 1, rank: 7, displayName: 'ferguson', value: 1},
//   {id: 1, rank: 8, displayName: 'graham', value: 1},
//   {id: 1, rank: 9, displayName: 'norton', value: 1},
//   {id: 1, rank: 10, displayName: 'ellen', value: 1},
// ];

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardComponent ],
      imports: [ MatTableModule ]
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
