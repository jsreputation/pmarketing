import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchComponent } from './scratch.component';
import { MatSliderModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { GameModule } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScratchComponent', () => {
  let component: ScratchComponent;
  let fixture: ComponentFixture<ScratchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchComponent ],
      imports: [
        MatSliderModule,
        GameModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
