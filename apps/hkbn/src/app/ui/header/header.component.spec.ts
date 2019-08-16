import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService, ProfileService } from '@perx/core';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: ProfileService, useValue: {whoAmI: () => of(true)}},
        {
          provide: AuthenticationService, useValue: {
            logout: () => {
            }
          }
        }
      ],
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router navigate, when call goBack method with setted backUrl and back setted to true', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.routeData = {
      backUrl: '/wallet',
      back: true
    };
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/wallet'], {relativeTo: route});
  });

  it('should call router navigate, when call goBack method with setted backUrl and cross setted to true', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.routeData = {
      backUrl: '/wallet',
      cross: true
    };
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/wallet'], {relativeTo: route});
  });

  it('should call router navigate, when call goBack and cross setted to true', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.routeData = {
      cross: true
    };
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith([''], {relativeTo: route});
  });
});
