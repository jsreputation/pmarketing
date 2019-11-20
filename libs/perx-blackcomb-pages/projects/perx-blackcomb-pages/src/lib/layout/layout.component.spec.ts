import { async, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ThemesService, AuthenticationService, ConfigModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

const themesServiceStub: Partial<ThemesService> = {};
const authServiceStub: Partial<AuthenticationService> = {};

describe('LayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        ConfigModule.forRoot({})
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
