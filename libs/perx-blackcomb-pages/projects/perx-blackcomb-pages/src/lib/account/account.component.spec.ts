import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, ProfileModule, ProfileService, ThemesService } from '@perx/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  const authenticationServiceStub = {};
  const profileServiceStub = {
    whoAmI: () => of()
  };
  const themeSvcStub = {
    getAccountSettings: () => of()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        RouterTestingModule,
        ProfileModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ThemesService, useValue: themeSvcStub }
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
