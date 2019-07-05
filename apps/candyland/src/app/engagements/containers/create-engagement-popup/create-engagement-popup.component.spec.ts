import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngagementPopupComponent } from './create-engagement-popup.component';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { InkModule } from '@cl-shared/components/ink/ink.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InkComponent } from '@cl-shared/components/ink/ink.component';
import { InkBarDirective } from '@cl-shared/components/ink/directives/ink-bar.directive';
import { InkHostDirective } from '@cl-shared/components/ink/directives/ink-host.directive';
import { InkListenerDirective } from '@cl-shared/components/ink/directives/ink-listener.directive';
import { EngagementTypeComponent } from './engagement-type/engagement-type.component';
import { EngagementsListPageComponent } from '../engagements-list-page/engagements-list-page.component';
import { EngagementsComponent } from '../engagements/engagements.component';
import { TypeItemComponent } from './engagement-type/type-item/type-item.component';
import { SurveyComponent } from './survey/survey.component';
import { GamesComponent } from './games/games.component';
import { StampComponent } from './stamp/stamp.component';
import { InstantRewardComponent } from './instant-reward/instant-reward.component';
import { GameComponent } from './games/game/game.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateEngagementPopupComponent', () => {
  let component: CreateEngagementPopupComponent;
  let fixture: ComponentFixture<CreateEngagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateEngagementPopupComponent,
        EngagementTypeComponent,
        EngagementsListPageComponent,
        EngagementsComponent,
        TypeItemComponent,
        SurveyComponent,
        GamesComponent,
        StampComponent,
        InstantRewardComponent,
        GameComponent
      ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatDialogModule,
        MatIconModule,
        InkModule,
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatRadioModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEngagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
