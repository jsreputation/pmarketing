import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampSettingsPageComponent } from './new-stamp-settings-page.component';

describe('NewStampSettingsPageComponent', () => {
  let component: NewStampSettingsPageComponent;
  let fixture: ComponentFixture<NewStampSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStampSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStampSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
