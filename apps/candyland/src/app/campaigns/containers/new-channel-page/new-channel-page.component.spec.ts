import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChannelPageComponent } from './new-channel-page.component';

describe('NewChannelPageComponent', () => {
  let component: NewChannelPageComponent;
  let fixture: ComponentFixture<NewChannelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChannelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChannelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
