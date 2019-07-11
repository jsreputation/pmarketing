import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeTreeComponent } from './shake-tree.component';

describe('ShakeTreeComponent', () => {
  let component: ShakeTreeComponent;
  let fixture: ComponentFixture<ShakeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
