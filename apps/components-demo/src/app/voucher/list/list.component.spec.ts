import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { VouchersModule, IVoucherService } from '@perxtech/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        VouchersModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
