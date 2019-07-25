import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
  } from '@angular/forms';
import { ProfileModule } from '@perx/core/dist/perx-core';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        ProfileModule.forRoot({ env: environment })
         ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
