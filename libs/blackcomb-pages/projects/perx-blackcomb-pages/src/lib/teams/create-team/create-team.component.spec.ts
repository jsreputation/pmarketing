import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamComponent } from './create-team.component';
import { ICampaignService, UtilsModule } from '@perxtech/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamComponent ],
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
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
