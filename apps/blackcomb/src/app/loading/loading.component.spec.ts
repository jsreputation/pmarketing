import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  const authenticationServiceStub = {
    getUserAccessToken: () => of(''),
    autoLogin: () => of()
  };

  beforeEach(async(() => {
    const routerStub = { navigate: () => ({}) };

    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        MatProgressSpinnerModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    if ((window as any).primaryIdentifier) {
      delete (window as any).primaryIdentifier;
    }
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
