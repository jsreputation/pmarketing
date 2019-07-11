import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateEngagementPopupModule } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.module';

@Component({
  selector: 'cl-dashboard-game-card',
  template: ''
})
class MockDashboardGameCardComponent {
  @Input() public gameCard;
}
@Component({
  selector: 'cl-business-insight',
  template: ''
})
class MockBusinessInsightComponent {
}

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ButtonModule,
        HttpClientTestingModule,
        CreateEngagementPopupModule,
      ],
      declarations: [
        DashboardPageComponent,
        MockDashboardGameCardComponent,
        MockBusinessInsightComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
