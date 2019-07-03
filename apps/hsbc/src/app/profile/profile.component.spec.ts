import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material';
import { AuthenticationModule, CognitoModule, OauthModule, ProfileModule } from '@perx/core/dist/perx-core';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        MatIconModule,
        AuthenticationModule,
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
        ProfileModule.forRoot({ env: environment }),
        RouterTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
