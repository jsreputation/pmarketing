import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColorSelectorComponent } from './dialog-color-selector.component';

describe('DialogColorSelectorComponent', () => {
  let component: DialogColorSelectorComponent;
  let fixture: ComponentFixture<DialogColorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogColorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogColorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
