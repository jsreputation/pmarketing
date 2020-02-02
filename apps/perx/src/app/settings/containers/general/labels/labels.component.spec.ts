import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsComponent } from './labels.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';

describe('LabelsComponent', () => {
  let component: LabelsComponent;
  let fixture: ComponentFixture<LabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsComponent],
      imports:[UnderConstructionModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
