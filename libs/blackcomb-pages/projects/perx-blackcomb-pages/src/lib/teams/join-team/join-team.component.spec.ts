import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeamComponent } from './join-team.component';
import { ICampaignService, UtilsModule } from '@perxtech/core';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

describe('JoinTeamComponent', () => {
  let component: JoinTeamComponent;
  let fixture: ComponentFixture<JoinTeamComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
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
        TranslateModule.forRoot()

      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } },

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
