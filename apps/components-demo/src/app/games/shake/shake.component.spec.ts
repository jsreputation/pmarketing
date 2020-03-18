import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeComponent } from './shake.component';
import { MatSliderModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { GameModule } from '@perxtech/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ShakeComponent', () => {
  let component: ShakeComponent;
  let fixture: ComponentFixture<ShakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeComponent],
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
    fixture = TestBed.createComponent(ShakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
