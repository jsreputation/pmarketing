// tslint:disable: typedef
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationModule, UtilsModule, AuthenticationService, ConfigService } from '@perx/core';
import { MatDialogModule } from '@angular/material';
import { of } from 'rxjs';

describe('AppComponent', () => {
  const authServiceStub = {};
  const configServiceStub = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthenticationModule,
        MatDialogModule,
        UtilsModule
      ],
      declarations: [AppComponent],
      providers: [
        {provide: AuthenticationService, useValue: authServiceStub},
        { provide: ConfigService, useValue: configServiceStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'digi'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('digi');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to digi!');
  // });
});
