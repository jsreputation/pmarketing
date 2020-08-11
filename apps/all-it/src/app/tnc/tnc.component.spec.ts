import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatIconModule } from '@angular/material';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ThemesService, ITheme } from '@perxtech/core';
import { of } from 'rxjs';

import { TncComponent } from './tnc.component';

describe('TncComponent', () => {
  
  const mockTheme: ITheme = {
    name: 'theme',
    properties: {
      '--background': 'red',
      '--font_color': 'black'
    }
  };
  let component: TncComponent;
  let fixture: ComponentFixture<TncComponent>;
  let location: Location;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of(mockTheme)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'c/tnc', redirectTo: '/' }
        ]),
        MatToolbarModule,
        MatIconModule,
      ],
      declarations: [ TncComponent ],
      providers: [
        {
          provide: ThemesService,
          useValue: themesServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TncComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should location back', () => {
    component.backArrowIcon = 'back';
    spyOn(location, 'back');
    component.backArrowClick();
    expect(location.back).toHaveBeenCalled();
  });
});
