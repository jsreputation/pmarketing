import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchComponent } from './scratch.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { GameModule } from '@perxtech/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScratchComponent', () => {
  let component: ScratchComponent;
  let fixture: ComponentFixture<ScratchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScratchComponent],
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
