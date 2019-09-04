import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakeComponent } from './shake.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule, GameService } from '@perx/core';
import { of } from 'rxjs';

describe('ShakeComponent', () => {
  let component: ShakeComponent;
  let fixture: ComponentFixture<ShakeComponent>;

  const gameServiceStub = {
    get: () => of(),
    getGamesFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeComponent],
      imports: [
        RouterTestingModule,
        GameModule
      ],
      providers: [
        { provide: GameService, useValue: gameServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
