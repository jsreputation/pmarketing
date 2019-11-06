import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Config } from '@perx/core';

import { PIComponent } from './pi.component';

const configStub: Partial<Config> = {
  preAuth: false
};

describe('PIComponent', () => {
  let component: PIComponent;
  let fixture: ComponentFixture<PIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PIComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Config, useValue: configStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
