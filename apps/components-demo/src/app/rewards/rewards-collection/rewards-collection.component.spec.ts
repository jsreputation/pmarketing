import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCollectionComponent } from './rewards-collection.component';
import { RewardsModule as PerxRewardsModule } from '@perx/core';
import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsCollectionComponent],
      imports: [
        PerxRewardsModule.forRoot({ env: environment }),
        HttpClientModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
