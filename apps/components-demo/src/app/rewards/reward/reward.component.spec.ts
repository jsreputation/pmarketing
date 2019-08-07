import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import {
  RewardsModule
} from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RewardsModule.forRoot({ env: environment }),
        MatButtonModule,
        HttpClientTestingModule
      ],
      declarations: [RewardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
