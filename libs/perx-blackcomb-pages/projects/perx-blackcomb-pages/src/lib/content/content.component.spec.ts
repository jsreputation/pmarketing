import { ThemesService } from '@perx/core';
import { of, BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';
// import { Type } from '@angular/core';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  const themeSvcStub: Partial<ThemesService> = {
    getAccountSettings: () => of()
  };

  const params = new BehaviorSubject({});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [MatProgressSpinnerModule],
      providers: [
        { provide: ThemesService, useValue: themeSvcStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params,
            queryParams: of({})
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe ('ngOnInit', () => {
    beforeEach(() => {
      params.next({ key: 'test' });
    });

    it('should display the error message, If key is valid but the content cannot be downloaded', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>);

      const themesServiceSpy = spyOn(themesService, 'getAccountSettings').and.returnValue(of(
        {pages: [{
          title: '',
          content_url: 'http://localhost:4200',
          key: 'test',
        }]}
      ));
      component.ngOnInit();
      tick();
      expect(themesServiceSpy).toHaveBeenCalled();
      component.content$.subscribe(
        () => {},
        () => {
          fixture.detectChanges();
          expect(component.errorFlag).toBe(true);
          expect(fixture.nativeElement.querySelector('.loading').innerText).toBe('Content Page Not Found');
        }
      );
    }));

    it('If the key is valid and the content can be fetched, it should render the fetched content.', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>);

      const themesServiceSpy = spyOn(themesService, 'getAccountSettings').and.returnValue(of(
        {pages: [{
          title: '',
          content_url: '',
          key: 'test',
        }]}
      ));
      component.ngOnInit();
      tick();
      expect(themesServiceSpy).toHaveBeenCalled();
      component.content$.subscribe(
        (res) => {
          fixture.detectChanges();
          expect(component.isLoading).toBe(false);
          expect(res).toContain('<html>');
        },
        () => {}
      );
    }));

    it('should display a spinner', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>);

      const themesServiceSpy = spyOn(themesService, 'getAccountSettings').and.returnValue(of(
        {pages: [{
          title: '',
          content_url: '', // will get the browser test
          key: 'test',
        }]}
      ));
      component.ngOnInit();
      tick();
      expect(themesServiceSpy).toHaveBeenCalled();
      const spinner = fixture.debugElement.queryAll(By.css('.loading .mat-spinner'));
      expect(spinner.length).toBe(1);
      component.content$.subscribe(
        () => {
          fixture.detectChanges();
          expect(spinner.length).toBe(0);
        },
        () => {}
      );
    }));

    it('If the key does not have any matching page, it should display the error message.', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>);

      const themesServiceSpy = spyOn(themesService, 'getAccountSettings').and.returnValue(of());
      component.ngOnInit();
      tick();
      expect(themesServiceSpy).toHaveBeenCalled();
      component.content$.subscribe(
        () => {
        },
        () => {
          fixture.detectChanges();
          expect(component.errorFlag).toBe(true);
          expect(fixture.nativeElement.querySelector('.loading').innerText).toBe('Content Page Not Found');
        }
      );
    }));

  });

  describe ('ngOnInit', () => {
    beforeEach(() => {
      params.next({});
    });

    it('If there is no routeParam key, it should display the error message.', fakeAsync(() => {
      const themesService: ThemesService = fixture.debugElement.injector.get<ThemesService>(
        ThemesService as Type<ThemesService>);

      const themesServiceSpy = spyOn(themesService, 'getAccountSettings').and.returnValue(of());
      component.ngOnInit();
      tick();
      expect(themesServiceSpy).not.toHaveBeenCalled();
      component.content$.subscribe(
        () => {
        },
        () => {
          fixture.detectChanges();
          expect(component.errorFlag).toBe(true);
          expect(fixture.nativeElement.querySelector('.loading').innerText).toBe('Content Page Not Found');
        }
      );
    }));

  });
});
