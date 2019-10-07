import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerxBlackcombPagesComponent } from './perx-blackcomb-pages.component';

describe('PerxBlackcombPagesComponent', () => {
  let component: PerxBlackcombPagesComponent;
  let fixture: ComponentFixture<PerxBlackcombPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerxBlackcombPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerxBlackcombPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
