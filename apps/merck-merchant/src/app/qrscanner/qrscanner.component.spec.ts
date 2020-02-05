import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QrscannerComponent } from './qrscanner.component';
import { HeaderComponent } from '../header/header.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatToolbarModule, MatIconModule } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

describe('QrscannerComponent', () => {
  let component: QrscannerComponent;
  let fixture: ComponentFixture<QrscannerComponent>;
  const locationStub = { back: () => {} };
  const routerStub = { navigate: () => ({}) };
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
