import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePlayComponent } from './puzzle-play.component';

describe('PuzzlePlayComponent', () => {
  let component: PuzzlePlayComponent;
  let fixture: ComponentFixture<PuzzlePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlePlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
