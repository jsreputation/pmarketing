import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { PuzzlesModule, ConfigService, ThemesService, ICampaignService, StampService } from '@perx/core';
import { MatSliderModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of()
  };
  const stampServiceStub: Partial<StampService> = {
    getStamps: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        PuzzlesModule,
        MatSliderModule,
        MatCheckboxModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
