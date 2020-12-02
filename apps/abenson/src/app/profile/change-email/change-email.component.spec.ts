import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared/shared.module';

import { ChangeEmailComponent } from './change-email.component';
import { ProfileService } from '@perxtech/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Type } from '@angular/core';
import { Router } from '@angular/router';

const profileServiceStub: Partial<ProfileService> = {
  updateUserInfo: () => of(),
  whoAmI: () => of({ email: 'email@e.mail' })
};

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;
  let profileService: ProfileService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeEmailComponent,
      ],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([{
          path: 'account',
          component: ChangeEmailComponent
        }])
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit data', fakeAsync(() => {
    spyOn(profileService, 'updateUserInfo').and.callThrough();
    const routerSpy = spyOn(router, 'navigate');
    component.onSubmit();
    router.navigate(['account']);
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['account']);
  }));
});
