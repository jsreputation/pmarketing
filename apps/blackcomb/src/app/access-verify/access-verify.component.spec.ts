import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessVerifyComponent } from './access-verify.component';
import { AuthenticationService } from '@perxtech/core';
import { of } from 'rxjs';

describe('AccessVerifyComponent', () => {
  let component: AccessVerifyComponent;
  let fixture: ComponentFixture<AccessVerifyComponent>;

  const authenticationServiceStub: Partial<AuthenticationService> = {
    getExchangeToken: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessVerifyComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
    .compileComponents();
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
