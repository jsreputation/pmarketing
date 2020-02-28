import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratsComponent } from './congrats.component';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StampService } from '@perx/core';
import { of } from 'rxjs';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;
  const router = {
    navigate: jest.fn()
  };

  const stampServiceStub: Partial<StampService> = {
    // @ts-ignore
    getCards: (id: number) => (of([]))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CongratsComponent, HeaderComponent],
      imports: [MatToolbarModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { snapshot: { url: 'congrats' }, queryParams: of({}) } },
        { provide: StampService, useValue: stampServiceStub },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onBackToGame', () => {
    component.onBackToGame();
    expect(router.navigate).toHaveBeenCalledWith(['bpi/game']);
  });

});
