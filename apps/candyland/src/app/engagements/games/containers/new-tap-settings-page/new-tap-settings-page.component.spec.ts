import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTapSettingsPageComponent } from './new-tap-settings-page.component';

describe('NewTapSettingsPageComponent', () => {
  let component: NewTapSettingsPageComponent;
  let fixture: ComponentFixture<NewTapSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTapSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTapSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
