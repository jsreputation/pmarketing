import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  LoyaltyModule,
  LoyaltyService,
  ILoyalty,
  ProfileService,
  RebatesListComponent,
  ThemesService,
  UtilsModule,
  DecimalPointsPipe,
} from '@perxtech/core';
import {
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RebatesWalletComponent } from './rebates-wallet.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RebatesWalletComponent', () => {
  let component: RebatesWalletComponent;
  let fixture: ComponentFixture<RebatesWalletComponent>;
  const profileServiceStub: Partial<ProfileService> = { whoAmI: () => of() };
  const themesServiceStub: Partial<ThemesService> = { getThemeSetting: () => of() };
  const mockLoyalty: ILoyalty = {
    id: 42,
    name: 'joe',
    pointsBalance: 42
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([mockLoyalty]),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RebatesWalletComponent,
        RebatesListComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        InfiniteScrollModule,
        LoyaltyModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        UtilsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        DecimalPointsPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebatesWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
