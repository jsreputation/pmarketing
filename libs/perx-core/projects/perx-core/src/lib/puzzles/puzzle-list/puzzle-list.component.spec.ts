import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleListComponent } from './puzzle-list.component';
import { MatCardModule } from '@angular/material';

describe('PuzzleListComponent', () => {
  let component: PuzzleListComponent;
  let fixture: ComponentFixture<PuzzleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleListComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
