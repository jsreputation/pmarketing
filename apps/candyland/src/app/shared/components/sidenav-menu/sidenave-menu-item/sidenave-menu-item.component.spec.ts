import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenaveMenuItemComponent } from './sidenave-menu-item.component';

describe('SidenaveMenuItemComponent', () => {
  let component: SidenaveMenuItemComponent;
  let fixture: ComponentFixture<SidenaveMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenaveMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenaveMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
