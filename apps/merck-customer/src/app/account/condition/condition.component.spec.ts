import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionComponent } from './condition.component';
import { SubscreenToolbarComponent } from '../subscreen-toolbar/subscreen-toolbar.component';
import {
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { Location } from '@angular/common';

describe('ConditionComponent', () => {
  let component: ConditionComponent;
  let fixture: ComponentFixture<ConditionComponent>;
  const locationStub = {
    goBack: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionComponent, SubscreenToolbarComponent ],
      imports: [ MatIconModule, MatToolbarModule ],
      providers: [
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
