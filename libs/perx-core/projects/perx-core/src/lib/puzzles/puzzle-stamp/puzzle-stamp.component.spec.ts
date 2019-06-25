import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleStampComponent } from './puzzle-stamp.component';
import { MatCardModule } from '@angular/material';

describe('PuzzleStampComponent', () => {
  let component: PuzzleStampComponent;
  let fixture: ComponentFixture<PuzzleStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleStampComponent],
      imports: [MatCardModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
