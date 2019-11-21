import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampComponent } from './stamp.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StampsService } from '@cl-core-services';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('StampComponent', () => {
  let component: StampComponent;
  let fixture: ComponentFixture<StampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StampComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: StampsService, useValue: {
            getStampsReport (id: any) {
              return of({id})
        }
          }}
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
