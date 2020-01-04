import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweepComponent } from './sweep.component';
import { MineSweeperComponent } from '@perx/core';

describe('SweepComponent', () => {
  let component: SweepComponent;
  let fixture: ComponentFixture<SweepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SweepComponent, MineSweeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
