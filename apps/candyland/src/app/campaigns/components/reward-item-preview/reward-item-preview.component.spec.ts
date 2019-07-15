import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemPreviewComponent } from './reward-item-preview.component';

describe('RewardItemPreviewComponent', () => {
  let component: RewardItemPreviewComponent;
  let fixture: ComponentFixture<RewardItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardItemPreviewComponent ]
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
