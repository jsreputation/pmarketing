import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemPreviewComponent } from './reward-item-preview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RewardItemPreviewComponent', () => {
  let component: RewardItemPreviewComponent;
  let fixture: ComponentFixture<RewardItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardItemPreviewComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
