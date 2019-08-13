import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CampaignModule, VouchersModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule, MatCardModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        VouchersModule.forRoot({ env: environment }),
        CampaignModule.forRoot({ env: environment }),
      ],
      providers: [
      ],
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
