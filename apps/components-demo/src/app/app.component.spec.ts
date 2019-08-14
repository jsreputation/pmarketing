import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { AuthenticationService } from '@perx/core';

describe('AppComponent', () => {
  const authenticationServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceStub}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'components-demo'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('components-demo');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to components-demo!');
  // });
});
