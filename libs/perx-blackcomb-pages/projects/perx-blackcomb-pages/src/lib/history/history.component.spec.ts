import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { VouchersModule, IVoucherService } from '@perx/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  const vouchersServiceStub: Partial<IVoucherService> = {
    getFromPage: () => of([]),
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [
        VouchersModule,
        InfiniteScrollModule,
        TranslateModule.forRoot()
      ],
      providers: [
        DatePipe,
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
