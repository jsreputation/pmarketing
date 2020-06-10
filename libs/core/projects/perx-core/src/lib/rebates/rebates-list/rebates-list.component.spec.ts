import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  MatCardModule,
  MatRippleModule
} from '@angular/material';
import { RebatesListComponent } from './rebates-list.component';
import { of } from 'rxjs';
import { ThemesService } from '../../utils/themes/themes.service';

describe('RebatesListComponent', () => {
  let component: RebatesListComponent;
  let fixture: ComponentFixture<RebatesListComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RebatesListComponent],
      imports: [
        MatCardModule,
        MatRippleModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
