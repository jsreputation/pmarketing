import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QrscannerComponent } from './qrscanner.component';
import { HeaderComponent } from '../header/header.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { ThemesService } from '@perxtech/core';

describe('QrscannerComponent', () => {
  let component: QrscannerComponent;
  let fixture: ComponentFixture<QrscannerComponent>;
  const locationStub: Partial<Location> = { back: () => {} };
  const routerStub = { navigate: () => ({}) };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  let params: Subject<Params>;

  beforeEach(async(() => {
    params = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [ QrscannerComponent, HeaderComponent ],
      imports: [ ZXingScannerModule, MatToolbarModule, MatIconModule ],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        { provide: ThemesService, useValue: themesServiceStub },

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scanSuccessHandler and navigate to order page', fakeAsync(() => {
    params.next({path: 'order'});
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigate').and.callThrough();
    component.scanSuccessHandler('fakedata');
    tick();
    expect(routerSpy).toHaveBeenCalledWith(['order'], { state: { data: 'fakedata' } });
  }));

});
