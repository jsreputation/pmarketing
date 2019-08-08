import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscreenToolbarComponent } from './subscreen-toolbar.component';
import {
  MatToolbarModule,
  MatIconModule
} from '@angular/material';
import { Location } from '@angular/common';

describe('SubscreenToolbarComponent', () => {
  let component: SubscreenToolbarComponent;
  let fixture: ComponentFixture<SubscreenToolbarComponent>;
  const locationStub = {
    goBack: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscreenToolbarComponent ],
      imports: [ MatToolbarModule, MatIconModule ],
      providers: [
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscreenToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
