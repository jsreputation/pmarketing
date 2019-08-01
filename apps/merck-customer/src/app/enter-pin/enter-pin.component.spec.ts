import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsModule, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EnterPinComponent } from './enter-pin.component';

describe('EnterPinComponent', () => {
  let component: EnterPinComponent;
  let fixture: ComponentFixture<EnterPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPinComponent ],
      imports: [
        UtilsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {forgotPassword: () => {}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
