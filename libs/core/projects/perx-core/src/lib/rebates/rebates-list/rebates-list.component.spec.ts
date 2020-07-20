import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  MatCardModule,
  MatRippleModule
} from '@angular/material';
import { RebatesListComponent } from './rebates-list.component';
import { of } from 'rxjs';
import { ThemesService } from '../../utils/themes/themes.service';
import { UtilsModule } from '../../utils/utils.module';
import { LoyaltyService } from '../../loyalty/loyalty.service';

describe('RebatesListComponent', () => {
  let component: RebatesListComponent;
  let fixture: ComponentFixture<RebatesListComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of(),
    getTransactions: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RebatesListComponent],
      imports: [
        MatCardModule,
        MatRippleModule,
        UtilsModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
