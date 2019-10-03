import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PuzzlesComponent } from './puzzles.component';
import { MatListModule } from '@angular/material';
import { CampaignModule, VouchersModule, PuzzlesModule, StampModule, StampService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PuzzlesComponent', () => {
  let component: PuzzlesComponent;
  let fixture: ComponentFixture<PuzzlesComponent>;
  const stampsServiceStub = {
    getCards: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzlesComponent],
      imports: [
        MatListModule,
        PuzzlesModule,
        NoopAnimationsModule,
        CampaignModule,
        VouchersModule,
        StampModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: StampService, useValue: stampsServiceStub}
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
