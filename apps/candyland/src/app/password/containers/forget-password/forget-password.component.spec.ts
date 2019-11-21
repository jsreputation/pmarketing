import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordComponent } from './forget-password.component';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswordComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        ButtonModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [{ provide: Location, useClass: SpyLocation }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    // note to self: must be set here, before component is instantiated
    const location: Location = TestBed.get(Location);
    spyOn(location, 'getState').and.returnValue({
      id: 'string',
      user: 'string',
      navigationId: 2
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
