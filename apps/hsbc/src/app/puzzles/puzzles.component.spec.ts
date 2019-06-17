import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlesComponent } from './puzzles.component';
import { MatListModule } from '@angular/material';
import { PerxCoreModule } from '@perx/core/dist/perx-core';
import { RouterModule } from '@angular/router';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzlesComponent],
      imports: [
        MatListModule,
        PerxCoreModule,
        RouterModule.forRoot([]),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
