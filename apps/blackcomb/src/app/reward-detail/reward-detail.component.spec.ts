import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardDetailComponent } from './reward-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule, CampaignModule } from '@perx/core/dist/perx-core';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CampaignModule.forRoot({ env: environment }),
        VouchersModule.forRoot({ env: environment })
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
