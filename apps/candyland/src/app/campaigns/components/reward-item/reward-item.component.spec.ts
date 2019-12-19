import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemComponent } from './reward-item.component';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('RewardItemComponent', () => {
  let component: RewardItemComponent;
  let fixture: ComponentFixture<RewardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(),],
      declarations: [RewardItemComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardItemComponent);
    component = fixture.componentInstance;
    component.outcomeData = {
      outcome: {
        probability: 0,
        limit: null,
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
