import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleDrawComponent } from './puzzle-draw.component';

describe('PuzzleDrawComponent', () => {
  let component: PuzzleDrawComponent;
  let fixture: ComponentFixture<PuzzleDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
