import { SimpleChanges, Type } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatRippleModule } from '@angular/material';
import { of } from 'rxjs';
import { EnvConfig } from '../../shared/env-config';
import { IStampCard, StampState } from '../../stamp/models/stamp.model';
import { StampService } from '../../stamp/stamp.service';
import { UtilsModule } from '../../utils/utils.module';
import { PuzzleListComponent } from './puzzle-list.component';

const SimpleChangesMock: SimpleChanges = {
  campaignId:
  {
    previousValue: 1,
    currentValue: 2,
    firstChange: true,
    isFirstChange: () => true
  }
};

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
    component.ngOnChanges(SimpleChangesMock);
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should puzzleSelected', () => {
    const spy = spyOn(component.selected, 'emit');
    component.puzzleSelected({} as IStampCard);
    expect(spy);
  });

  it('init Total else branch', fakeAsync(() => {
    component.campaignId = 1;
    const spy = spyOn(component.completed, 'emit');
    spyOn(stampService, 'getCards').and.returnValue(of([]));
    component.ngOnChanges(SimpleChangesMock);
    tick();
    expect(spy).toHaveBeenCalled();
    expect(component.total).toBe(null);
    // handle else branch
    component.ngOnChanges({});
    // campaignId is null branch
    component.campaignId = null;
    component.ngOnChanges(SimpleChangesMock);
  }));

  it('init with title fn', () => {
    const testFn = () => 'test';
    component.titleFn = testFn;
    component.puzzleTextFn = testFn;
    component.ngOnInit();
    expect(component.titleFn).toEqual(testFn);
    expect(component.puzzleTextFn).toEqual(testFn);
  });

  it('init without title fn', () => {
    delete component.titleFn;
    delete component.puzzleTextFn;
    component.ngOnInit();
    const title = component.titleFn(1);
    expect(title).toBe(`Puzzle #${component.indexToLetter(1)}`);
    const puzzle = component.puzzleTextFn();
    expect(puzzle).toBe('new pieces');
  });
});
