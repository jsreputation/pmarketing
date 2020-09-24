import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsLargeListComponent } from './rewards-large-list.component';
import {
  ProgressBarModule,
  ThemesService,
  UtilsModule
} from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

describe('RewardsLargeListComponent', () => {
  let component: RewardsLargeListComponent;
  let fixture: ComponentFixture<RewardsLargeListComponent>;
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsLargeListComponent ],
      imports: [
        UtilsModule,
        MatCardModule,
        ProgressBarModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsLargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
