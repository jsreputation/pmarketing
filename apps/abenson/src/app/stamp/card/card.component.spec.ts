import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PuzzlesModule, StampService } from '@perx/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const stampServiceStub = {
    getCurrentCard: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule, PuzzlesModule],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
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
