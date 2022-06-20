import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessVerifyComponent } from './access-verify.component';
import { AuthenticationService, TokenStorage } from '@perxtech/core';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AccessVerifyComponent', () => {
  let component: AccessVerifyComponent;
  let fixture: ComponentFixture<AccessVerifyComponent>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    getExchangeToken: () => of(),
  };

  const tokenStorageStub = {
    clearAppInfoProperty: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessVerifyComponent],
      imports: [RouterTestingModule, MatProgressSpinnerModule],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        {
          provide: TokenStorage,
          useValue: tokenStorageStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
