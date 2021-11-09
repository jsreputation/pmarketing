import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaggedItemComponent } from './tagged-item.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaggedItemComponent', () => {
  let component: TaggedItemComponent;
  let fixture: ComponentFixture<TaggedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedItemComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
