import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared/shared.module';

import { ChangeEmailComponent } from './change-email.component';
import { ProfileService } from '@perx/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const profileServiceStub = {
  updateUserInfo: () => of(),
  whoAmI: () => of({email: 'email@e.mail'})
};

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
