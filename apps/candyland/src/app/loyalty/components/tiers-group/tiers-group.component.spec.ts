import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiersGroupComponent } from './tiers-group.component';

describe('TiersGroupComponent', () => {
  let component: TiersGroupComponent;
  let fixture: ComponentFixture<TiersGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiersGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
