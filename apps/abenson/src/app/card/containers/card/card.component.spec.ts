import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Observable, of } from 'rxjs';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  IProfile,
  LoyaltyModule,
  LoyaltyService,
  ProfileService,
  ILoyaltyTransaction, ConfigService, IConfig,
} from '@perxtech/core';

import { CardComponent } from './card.component';
import { SharedModule } from '../../../shared/shared.module';
import { loyalty } from '../../../mock/loyalty.mock';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Type } from '@angular/core';

const transaction: ILoyaltyTransaction = {
  id: 0,
  points: -11,
  earnedDate: new Date().toString(),
  pointsBalance: 1,
  currencyBalance: 50,
  properties: {}
};

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let loyaltyService: LoyaltyService;
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([loyalty]),
    getLoyalty: () => of(loyalty),
    getTransactions: () => of([])
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: <T>(): Observable<IConfig<T>> => of()
  };
  const mockProfile: IProfile = {
    id: 1,
    state: 'active',
    firstName: '',
    lastName: ''
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of(mockProfile)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        SharedModule,
        LoyaltyModule,
        NoopAnimationsModule,
        NgxBarcode6Module,
        InfiniteScrollModule
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    loyaltyService = TestBed.get<LoyaltyService>(LoyaltyService as Type<LoyaltyService>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoulld priceLabelFn', () => {
    component.priceLabelFn(transaction).subscribe(text => expect(text).toBe('Points spent'));
    component.priceLabelFn({ ...transaction, points: 11 }).subscribe(text => expect(text).toBe('Points earned'));
  });

  it('should change tab, trigger onscroll', () => {
    const loyaltySpy = spyOn(loyaltyService, 'getTransactions').and.returnValue(of());
    component.transactionsEnded = false;
    component.tabChanged({ index: 1 } as MatTabChangeEvent);
    component.onScroll();
    expect(loyaltySpy).toHaveBeenCalled();
  });

});
