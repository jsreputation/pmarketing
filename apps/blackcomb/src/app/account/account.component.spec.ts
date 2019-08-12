import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationModule, CognitoModule, ProfileModule, OauthModule } from '@perx/core';
import { environment } from '../../environments/environment';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [
        RouterTestingModule,
        AuthenticationModule,
        ProfileModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
