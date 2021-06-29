import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeamComponent } from './join-team.component';
import { ICampaignService, TeamsService, UtilsModule } from '@perxtech/core';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('JoinTeamComponent', () => {
  let component: JoinTeamComponent;
  let fixture: ComponentFixture<JoinTeamComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
  };
  const teamsServiceStub: Partial<TeamsService> = {
    joinATeamForCampaign: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinTeamComponent ],
      imports: [
        UtilsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule,
        TranslateModule.forRoot()

      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } },
        { provide: TeamsService, useValue: teamsServiceStub }

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
