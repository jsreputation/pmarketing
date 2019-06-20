import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleListComponent } from './puzzle-list.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from '../../campaign/env-config';

describe('PuzzleListComponent', () => {
  let component: PuzzleListComponent;
  let fixture: ComponentFixture<PuzzleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleListComponent],
      imports: [
        MatCardModule,
        MatRippleModule,
        HttpClientModule
      ],
      providers: [
        EnvConfig
      ]
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
