import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LoyaltyModule, ProfileModule, RewardsModule } from '@perx/core';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigateToolbarModule } from '../navigate-toolbar/navigate-toolbar.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        NavigateToolbarModule,
        RouterTestingModule,
        LoyaltyModule.forRoot({ env: environment }),
        ProfileModule.forRoot({ env: environment }),
        RewardsModule.forRoot({ env: environment }),
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
