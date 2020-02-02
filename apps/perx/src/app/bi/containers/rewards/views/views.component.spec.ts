import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsComponent } from './views.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';

describe('ViewsComponent', () => {
  let component: ViewsComponent;
  let fixture: ComponentFixture<ViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsComponent],
      imports:[UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
