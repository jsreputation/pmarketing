import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinComponent } from './spin.component';
import { GameModule } from '@perxtech/core';
import { MatButtonToggleModule } from '@angular/material';

describe('SpinComponent', () => {
  let component: SpinComponent;
  let fixture: ComponentFixture<SpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinComponent],
      imports: [GameModule, MatButtonToggleModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
