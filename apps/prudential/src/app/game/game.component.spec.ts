import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { RouterModule, Router } from '@angular/router';
import { CampaignModule, ShakeTreeComponent, GameModule, CampaignService, VouchersService } from '@perx/core/dist/perx-core';
import { APP_BASE_HREF } from '@angular/common';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let router: Router;

  class FakeCampaignService {
    fakeCampaignsResult = {
      data: [
        {
          id: 1,
          name: 'UAT GAME',
          description: 'UAT description',
          begins_at: '2019-06-26T08:46:06.000Z',
          ends_at: null,
          enrolled: true,
          campaign_type: 'game',
          campaign_referral_type: 'user',
          campaign_config: {
            campaign_results: {
              count: 6,
              first_result_id: 1
            }
          },
          images: [],
          favourite: false,
          custom_fields: {},
          category_tags: [],
          tags: []
        }
      ],
      meta: {}
    };
    getCampaigns() {
      return of(this.fakeCampaignsResult);
    }
  }
  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, ShakeTreeComponent],
      imports: [
        RouterModule.forRoot([]),
        CampaignModule.forRoot({ env: environment }),
        GameModule.forRoot({ env: environment }),
        MatProgressBarModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: CampaignService,
          useValue: FakeCampaignService
        },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: VouchersService, useValue: vouchersServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stay in game page if game remaining number of tries greater than 0', () => {
    spyOn(router, 'navigate').and.stub();
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalled();
  });
});
