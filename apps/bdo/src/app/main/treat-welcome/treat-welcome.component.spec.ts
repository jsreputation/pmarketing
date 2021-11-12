import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { TreatWelcomeComponent } from './treat-welcome.component';
import { ICampaignService } from '@perxtech/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateService } from '@ngx-translate/core';

class MockCampaignService {
  getCampaign(id) {
    return of([id]);
  }
}
describe('TreatWelcomeComponent', () => {
  let component: TreatWelcomeComponent;
  let fixture: ComponentFixture<TreatWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatWelcomeComponent],
      imports: [RouterTestingModule, MatExpansionModule],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        {
          provide: ICampaignService,
          useClass: MockCampaignService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
        { 
          provide: TranslateService, 
          useValue: {} 
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
