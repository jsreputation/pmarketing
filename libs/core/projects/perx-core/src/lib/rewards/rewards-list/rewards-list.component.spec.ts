import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { of } from 'rxjs';
import { RewardsListComponent } from './rewards-list.component';
import { UtilsModule } from '../../utils/utils.module';
import { ThemesService } from '../../utils/themes/themes.service';
import {
  SafeHtmlPipe,
  StripHtmlPipe
} from '@perxtech/core';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RewardsListComponent,
        SafeHtmlPipe,
        StripHtmlPipe
      ],
      imports: [
        MatCardModule,
        UtilsModule
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
