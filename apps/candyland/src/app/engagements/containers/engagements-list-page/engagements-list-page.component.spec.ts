import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListPageComponent } from './engagements-list-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableFiltersModule } from '@cl-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { EngagementsService } from '@cl-core-services';
import { MockEngagementsService } from '@cl-shared/test-components/providers/mock-engagements.service';

describe('EngagementsListPageComponent', () => {
  let component: EngagementsListPageComponent;
  let fixture: ComponentFixture<EngagementsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TableFiltersModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        },
        { provide: EngagementsService, useClass: MockEngagementsService }
      ],
      declarations: [EngagementsListPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
