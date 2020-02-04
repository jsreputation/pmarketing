import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PuzzleListComponent } from './puzzle-list.component';
import { MatCardModule, MatRippleModule, MatIconModule } from '@angular/material';
import { EnvConfig } from '../../shared/env-config';
import { StampService } from '../../stamp/stamp.service';
import { UtilsModule } from '../../utils/utils.module';
import { of } from 'rxjs';
import { Type, SimpleChanges } from '@angular/core';
import { IStampCard, StampState } from '../../stamp/models/stamp.model';

describe('PuzzleListComponent', () => {
  let component: PuzzleListComponent;
  let fixture: ComponentFixture<PuzzleListComponent>;
  let stampService: StampService;
  const stampServiceMock: Partial<StampService> = {
    getCards: () => of([])
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleListComponent],
      imports: [
        MatCardModule,
        MatRippleModule,
        MatIconModule,
        UtilsModule
      ],
      providers: [
        EnvConfig,
        { provide: StampService, useValue: stampServiceMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleListComponent);
    component = fixture.componentInstance;
    stampService = TestBed.get(StampService as Type<StampService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnChanges', fakeAsync(() => {
    component.campaignId = 1;
    const spy = jest.spyOn(component.completed, 'emit');
    jest.spyOn(stampService, 'getCards').mockReturnValue(of([{
      displayProperties: {

      }, stamps: [{ state: StampState.redeemed, id: 1 }]
    } as IStampCard]));
    component.ngOnChanges({
      campaignId:
      {
        previousValue: 1,
        currentValue: 2,
        firstChange: true,
        isFirstChange: () => true
      }
    } as SimpleChanges);
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
