import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { CampaignModule, ShakeTreeComponent, GameModule, VouchersService } from '@perx/core/dist/perx-core';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, ShakeTreeComponent],
      imports: [
        RouterModule.forRoot([]),
        CampaignModule.forRoot({ env: environment }),
        GameModule.forRoot({ env: environment }),
        MatProgressBarModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
