import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTeamComponent } from './pending-team.component';
import { ICampaignService, TeamsService, UtilsModule } from '@perxtech/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('PendingTeamComponent', () => {
  let component: PendingTeamComponent;
  let fixture: ComponentFixture<PendingTeamComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
  };
  const teamsServiceStub: Partial<TeamsService> = {
    leaveATeam: () => of(),
    getTeam: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTeamComponent ],
      imports: [
        UtilsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } },
        { provide: TeamsService, useValue: teamsServiceStub },

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
