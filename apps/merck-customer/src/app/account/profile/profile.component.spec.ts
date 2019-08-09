import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { SubscreenToolbarComponent } from '../subscreen-toolbar/subscreen-toolbar.component';
import {
  MatIconModule,
  MatToolbarModule
} from '@angular/material';
import { Location } from '@angular/common';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const locationStub = {
    goBack: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, SubscreenToolbarComponent ],
      imports: [ MatIconModule, MatToolbarModule ],
      providers: [
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
