import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PuzzlesComponent } from './puzzles.component';
import { MatListModule } from '@angular/material';
import { CampaignModule, VouchersModule, PuzzlesModule, StampModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzlesComponent],
      imports: [
        MatListModule,
        PuzzlesModule,
        NoopAnimationsModule,
        CampaignModule.forRoot({ env: environment }),
        VouchersModule.forRoot({ env: environment }),
        StampModule.forRoot({ env: environment }),
        RouterTestingModule,
      ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
