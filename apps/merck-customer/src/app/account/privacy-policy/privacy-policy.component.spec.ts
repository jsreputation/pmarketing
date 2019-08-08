import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyComponent } from './privacy-policy.component';
import { SubscreenToolbarComponent } from '../subscreen-toolbar/subscreen-toolbar.component';
import {
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { Location } from '@angular/common';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;
  const locationStub = {
    goBack: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyComponent, SubscreenToolbarComponent ],
      imports: [ MatIconModule, MatToolbarModule ],
      providers: [
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
