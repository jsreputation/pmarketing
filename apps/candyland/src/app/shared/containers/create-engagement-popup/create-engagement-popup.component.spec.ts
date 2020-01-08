import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngagementPopupComponent } from './create-engagement-popup.component';
import {
  MAT_DIALOG_DATA, MatButtonModule,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule, MatMenuModule, MatPaginatorModule,
  MatRadioModule,
  MatSelectModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import { InkModule } from '../../components/ink/ink.module';
import { ButtonModule } from '@perx/candyshop';
import { ReactiveFormsModule } from '@angular/forms';
import { EngagementTypeComponent } from './engagement-type/engagement-type.component';
import { EngagementsListPageComponent } from '../../../engagements/containers/engagements-list-page/engagements-list-page.component';
import { EngagementsComponent } from '../../../engagements/containers/engagements/engagements.component';
import { TypeItemComponent } from './engagement-type/type-item/type-item.component';
import { SurveyComponent } from './survey/survey.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './games/game/game.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableFiltersModule } from '../../table/table-filters/table-filters.module';
import { SearchFilterModule } from '../../table/search-filter/search-filter.module';
import { TabsFilterModule } from '../../table/tabs-filter/tabs-filter.module';
import { StatusLabelModule } from '../../components/status-label/status-label.module';
import { NoDataModule } from '../../table/no-data/no-data.module';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ShakeTreeService } from '@cl-core/services';
import { TranslateModule } from '@ngx-translate/core';

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
        GameComponent
      ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        InkModule,
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatRadioModule,
        ReactiveFormsModule,
        TableFiltersModule,
        SearchFilterModule,
        TabsFilterModule,
        StatusLabelModule,
        MatSortModule,
        MatPaginatorModule,
        MatMenuModule,
        MatButtonModule,
        NoDataModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        {
          provide: ShakeTreeService, useValue: {
            getBackground: () => of([]),
            getGiftBox: () => of([]),
            getGamesTree: () => of([]),
            getGameNumberGifts: () => of([]),
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
