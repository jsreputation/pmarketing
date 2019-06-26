import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShakeSettingsPageComponent } from './new-shake-settings-page.component';

describe('NewShakeSettingsPageComponent', () => {
  let component: NewShakeSettingsPageComponent;
  let fixture: ComponentFixture<NewShakeSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShakeSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShakeSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
