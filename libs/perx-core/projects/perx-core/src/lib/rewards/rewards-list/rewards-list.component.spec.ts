import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';

import { RewardsListComponent } from './rewards-list.component';
import { UtilsModule } from '../../utils/utils.module';
import { ThemesService } from '../../utils/themes/themes.service';
import { TranslateModule } from '@ngx-translate/core';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsListComponent],
      imports: [
        MatCardModule,
        UtilsModule,
        NgxMultiLineEllipsisModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
