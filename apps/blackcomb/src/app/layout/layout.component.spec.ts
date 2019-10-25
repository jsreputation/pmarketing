import { async, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { ThemesService, AuthenticationService } from '@perx/core';

const themesServiceStub = {};
const authServiceStub = {};

describe('LayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatDialogModule,
        MatToolbarModule,
        MatIconModule
      ],
      declarations: [
        LayoutComponent
      ],
      providers: [
        {
          provide: ThemesService,
          useValue: themesServiceStub
        },
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
