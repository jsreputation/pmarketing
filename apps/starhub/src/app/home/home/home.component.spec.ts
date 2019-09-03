import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatToolbarModule, MatTabsModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { LoyaltyService } from '@perx/core';
import { of } from 'rxjs';
import { loyalty } from 'src/app/loyalty.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const loyaltyServiceStub = {
    getLoyalty: () => of(loyalty)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NoRenewaleInNamePipe],
      imports: [
        MatToolbarModule,
        MatTabsModule,
        RouterTestingModule
      ],
      providers: [
        NoRenewaleInNamePipe,
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
