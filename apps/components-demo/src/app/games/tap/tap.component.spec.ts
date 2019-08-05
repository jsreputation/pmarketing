import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapComponent } from './tap.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { GameModule } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TapComponent', () => {
  let component: TapComponent;
  let fixture: ComponentFixture<TapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        GameModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
