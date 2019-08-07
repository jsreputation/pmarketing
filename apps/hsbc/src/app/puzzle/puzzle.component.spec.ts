import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PuzzleComponent } from './puzzle.component';
import { CampaignModule, VouchersModule, PuzzlesModule, StampModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';
import { SoundModule } from '../sound/sound.module';

describe('PuzzleComponent', () => {
  let component: PuzzleComponent;
  let fixture: ComponentFixture<PuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleComponent ],
      imports: [
        PuzzlesModule,
        SoundModule,
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule.forRoot({ env: environment }),
        CampaignModule.forRoot({ env: environment }),
        StampModule.forRoot({ env: environment }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
