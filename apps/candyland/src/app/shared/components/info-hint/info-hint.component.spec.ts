import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHintComponent } from './info-hint.component';

describe('InfoHintComponent', () => {
  let component: InfoHintComponent;
  let fixture: ComponentFixture<InfoHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
