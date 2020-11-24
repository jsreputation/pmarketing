import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReferralComponent } from './referral.component';
import { TranslateModule } from '@ngx-translate/core';
import { ICampaignService } from '@perxtech/core';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material';

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaigns: () => of([])
};

describe('ReferralComponent', () => {
  const testId = 584;
  let component: ReferralComponent;
  let fixture: ComponentFixture<ReferralComponent>;
  const params = new BehaviorSubject({ type: 'id' });
  const activatedRouteStub: Partial<ActivatedRoute> = {
    params,
    queryParams: of({ id: testId })
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralComponent],
      imports: [
        MatToolbarModule,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
