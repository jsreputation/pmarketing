import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHintComponent } from './info-hint.component';
import { MatIconModule } from '@angular/material';

describe('InfoHintComponent', () => {
  let component: InfoHintComponent;
  let fixture: ComponentFixture<InfoHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [ InfoHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
