import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesComponent } from './roles.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolesComponent],
      imports:[UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
