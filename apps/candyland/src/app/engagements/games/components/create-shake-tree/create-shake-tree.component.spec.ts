import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShakeTreeComponent } from './create-shake-tree.component';

describe('CreateShakeTreeComponent', () => {
  let component: CreateShakeTreeComponent;
  let fixture: ComponentFixture<CreateShakeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShakeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShakeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
