import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  IVoucherService, ConfigService, RewardsModule, UtilsModule, ThemesService
} from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { LargeVouchersComponent } from './large-vouchers.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

const themesServiceStub: Partial<ThemesService> = { getThemeSetting: () => of() };

describe('LargeVouchersComponent', () => {
  let component: LargeVouchersComponent;
  let fixture: ComponentFixture<LargeVouchersComponent>;

  const voucherServiceStub: Partial<IVoucherService> = {
    getFromPage: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeVouchersComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        InfiniteScrollModule,
        RewardsModule,
        UtilsModule,
        HttpClientModule,
        MatCardModule
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        {
          provide: ConfigService, useValue: {
            readAppConfig: () => of({}),
            getTenantAppSettings: (key: string) => of({ key }),
            getAccountSettings: () => { }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
