
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { IProfile, LoyaltyModule, LoyaltyService, ProfileService } from '@perx/core';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxBarcodeModule } from 'ngx-barcode';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {SharedModule} from "../../../shared/shared.module";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const loyaltyServiceStub = {
    getLoyalties: () => of([]),
    getAllTransactions: () => of([])
  };
  const mockProfile: IProfile = {
    id: 1,
    state: 'active',
    firstName: '',
    lastName: ''
  };
  const profileServiceStub = {
    whoAmI: () => of(mockProfile)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [
        SharedModule,
        LoyaltyModule,
        NoopAnimationsModule,
        NgxBarcodeModule,
        InfiniteScrollModule,
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
