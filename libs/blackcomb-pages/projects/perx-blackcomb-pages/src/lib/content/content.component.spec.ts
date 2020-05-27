import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PagesObject, SettingsService, ThemesService } from '@perxtech/core';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { ContentComponent } from './content.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  let params: ReplaySubject<Params>;
  const getAccountSettingsSpy: jest.Mock = jest.fn();
  const settingsServiceStub: Partial<SettingsService> = {
    getAccountSettings: getAccountSettingsSpy,
  };
  const getSpy: jest.Mock = jest.fn();
  const httpClientStub: Partial<HttpClient> = { get: getSpy };
  const themeServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of({
      name: '',
      properties: {
        '--background': 'white',
        '--font_color': 'blue'
      }
    })
  };

  beforeEach(async(() => {
    params = new ReplaySubject<Params>();
    const activatedRouteStub: Partial<ActivatedRoute> = {
      params,
      queryParams: of({})
    };
    TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [
        MatProgressSpinnerModule,
        TranslateModule.forRoot(),
        MatToolbarModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: HttpClient, useValue: httpClientStub },
        { provide: ThemesService, useValue: themeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      params.next({ key: 'test' });
    });

    it('should display the error message, If key is valid but the content cannot be downloaded', fakeAsync(() => {
      const pages: PagesObject = {
        pages: [{
          title: '',
          content_url: 'http://failingStuff',
          key: 'test',
        }]
      };
      getAccountSettingsSpy.mockReturnValue(of(pages));
      getSpy.mockReturnValue(throwError('failed'));

      component.ngOnInit();
      fixture.detectChanges();

      flushMicrotasks();
      expect(getAccountSettingsSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith('https://cors-proxy.perxtech.io/?url=http://failingStuff', { responseType: 'text' });
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content')).toBeNull();
      expect(compiled.querySelector('.error')).toBeDefined();
      expect(compiled.querySelector('.spinner')).toBeNull();
    }));

    it('it should render the fetched content, if the key is valid and the content can be fetched.', fakeAsync(() => {
      const pages: PagesObject = {
        pages: [{
          title: '',
          content_url: 'http://goodStuff',
          key: 'test',
        }]
      };
      getAccountSettingsSpy.mockReturnValue(of(pages));
      getSpy.mockReturnValue('blabla');

      component.ngOnInit();
      fixture.detectChanges();

      flushMicrotasks();
      expect(getAccountSettingsSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith('https://cors-proxy.perxtech.io/?url=http://goodStuff', { responseType: 'text' });
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content')).not.toBeNull();
      expect(compiled.querySelector('.error')).toBeNull();
      expect(compiled.querySelector('.spinner')).toBeNull();
    }));

    it('should display a spinner while content is being fetched.', fakeAsync(() => {
      const pages: PagesObject = {
        pages: [{
          title: '',
          content_url: 'http://goodStuff',
          key: 'test',
        }]
      };
      getAccountSettingsSpy.mockReturnValue(of(pages));
      getSpy.mockReturnValue(new Observable());

      component.ngOnInit();
      fixture.detectChanges();

      flushMicrotasks();
      expect(getAccountSettingsSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith('https://cors-proxy.perxtech.io/?url=http://goodStuff', { responseType: 'text' });
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content')).toBeNull();
      expect(compiled.querySelector('.error')).toBeNull();
      expect(compiled.querySelector('.spinner')).toBeDefined();
    }));

    it('should display the error message, if the key does not have any matching page.', fakeAsync(() => {
      const pages: PagesObject = {
        pages: []
      };
      getAccountSettingsSpy.mockReturnValue(of(pages));
      // @ts-ignore
      getSpy.mockReturnValue('blabla');

      component.ngOnInit();
      fixture.detectChanges();

      flushMicrotasks();
      expect(getAccountSettingsSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).not.toHaveBeenCalled();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content')).toBeNull();
      expect(compiled.querySelector('.error')).toBeDefined();
      expect(compiled.querySelector('.spinner')).toBeNull();
    }));

  });

  describe('ngOnInit with no key', () => {
    beforeEach(() => {
      params.next({});
    });

    it('it should display the error message, if there is no routeParam key, ', fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();

      flushMicrotasks();
      expect(getAccountSettingsSpy).not.toHaveBeenCalled();
      expect(getSpy).not.toHaveBeenCalled();
      // TODO test html
    }));

  });
});
