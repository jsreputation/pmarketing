import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { RewardsService, ConfigService } from '@perxtech/core';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

describe('SearchComponent', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const rewardsServiceStub: Partial<RewardsService> = {
    getRewards: () => of(),
    getTrending: () => of(),
    getSearchHistory: () => of()
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers:
        [
          { provide: ConfigService, useValue: configServiceStub },
          { provide: RewardsService, useValue: rewardsServiceStub },
          { provide: Router, useValue: routerBdo }
        ],
      imports: [
        MatDialogModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
