import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserComponent } from './update-user.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { AuthService, MessageService } from '@cl-core-services';
import { Router, UrlTree } from '@angular/router';
// tslint:disable-next-line: import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  const authServiceStub: Partial<AuthService> = {};
  const messageServiceStub: Partial<MessageService> = {};
  const routerStub: Partial<Router> = {
    parseUrl: () => new UrlTree(),
    url: 'http://yo'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ButtonModule,
        NoopAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: MessageService, useValue: messageServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
