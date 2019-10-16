import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TncComponent } from './tnc.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Type } from '@angular/core';
import { Location } from '@angular/common';

describe('TncComponent', () => {
  let component: TncComponent;
  let fixture: ComponentFixture<TncComponent>;

  const locationStub = {
    back: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TncComponent ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Location, useValue: locationStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back', () => {
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back').and.callThrough();
    component.back();
    expect(locationSpy).toHaveBeenCalled();
  });
});
