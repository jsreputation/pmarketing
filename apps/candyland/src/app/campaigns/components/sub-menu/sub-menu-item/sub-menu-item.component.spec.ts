import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SubMenuItemComponent } from './sub-menu-item.component';

describe('SubMenuItemComponent', () => {
  let component: SubMenuItemComponent;
  let fixture: ComponentFixture<SubMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMenuItemComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuItemComponent);
    component = fixture.componentInstance;
    component.title = 'test';
    component.count = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
