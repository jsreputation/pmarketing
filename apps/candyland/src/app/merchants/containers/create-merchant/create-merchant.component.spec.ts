import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchantComponent } from './create-merchant.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('CreateMerchantComponent', () => {
  let component: CreateMerchantComponent;
  let fixture: ComponentFixture<CreateMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserDynamicTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [CreateMerchantComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
