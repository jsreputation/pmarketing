import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBarangayComponent } from './change-barangay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from '@perx/core';
import { of } from 'rxjs';

describe('ChangeBarangayComponent', () => {
  let component: ChangeBarangayComponent;
  let fixture: ComponentFixture<ChangeBarangayComponent>;
  const profileServiceStub = {
    setCustomProperties: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBarangayComponent ],
      imports: [
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBarangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
