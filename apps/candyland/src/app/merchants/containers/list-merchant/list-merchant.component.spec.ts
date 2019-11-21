import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMerchantComponent } from './list-merchant.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFiltersModule } from '@cl-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

describe('ListMerchantComponent', () => {
  let component: ListMerchantComponent;
  let fixture: ComponentFixture<ListMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          BrowserDynamicTestingModule,
          FormsModule,
          ReactiveFormsModule,
          TableFiltersModule,
          HttpClientTestingModule,
          MatDialogModule,
          TranslateModule.forRoot()
        ],
        providers: [
          {
            provide: MatDialogRef, useValue: {
              close: () => {
              }
            }
          }
        ],
        declarations: [ListMerchantComponent],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
