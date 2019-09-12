import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TapComponent } from './tap.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule, IGameService } from '@perx/core';
import { of } from 'rxjs';

describe('TapComponent', () => {
  let component: TapComponent;
  let fixture: ComponentFixture<TapComponent>;

  const gameServiceStub = {
    get: () => of(),
    getGamesFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TapComponent],
      imports: [RouterTestingModule, GameModule],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
