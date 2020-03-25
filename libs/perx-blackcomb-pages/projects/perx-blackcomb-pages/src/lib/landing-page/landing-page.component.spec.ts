import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageComponent } from './landing-page.component';
import { ThemesService } from '@perxtech/core';
import { of } from 'rxjs';

const themeServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of({
    apiHost: 'string',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: 'string',
    name: '',
    properties: {
      '--background': 'red',
      '--font_color': 'white'
    }
  })
};

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [MatToolbarModule, RouterTestingModule],
      providers: [
        { provide: ThemesService, useValue: themeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
