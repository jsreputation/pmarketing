import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Config, IGameService, InstantOutcomeService, AuthenticationService } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { PIComponent } from './pi.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const configStub: Partial<Config> = {
  preAuth: false
};

const gameServiceStub: Partial<IGameService> = {
  prePlayConfirm: () => of()
};

const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
  prePlayConfirm: () => of()
};

const authServiceStub: Partial<AuthenticationService> = {
  getUserId: () => 0,
  autoLogin: () => of(),
  mergeUserById: () => of(),
};

describe('PIComponent', () => {
  let component: PIComponent;
  let fixture: ComponentFixture<PIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PIComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Config, useValue: configStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
