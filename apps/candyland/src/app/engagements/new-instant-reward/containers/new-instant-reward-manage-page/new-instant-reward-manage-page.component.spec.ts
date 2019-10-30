import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantRewardManagePageComponent } from './new-instant-reward-manage-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@cl-core/services/local-storage.service';

describe('NewInstantRewardManagePageComponent', () => {
  let component: NewInstantRewardManagePageComponent;
  let fixture: ComponentFixture<NewInstantRewardManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: LocalStorageService, useValue: {}}
      ],
      declarations: [NewInstantRewardManagePageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantRewardManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
