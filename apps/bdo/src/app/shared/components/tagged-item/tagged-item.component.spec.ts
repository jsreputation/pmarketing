import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaggedItemComponent } from './tagged-item.component';
import { MatIconModule } from '@angular/material/icon';

describe('TaggedItemComponent', () => {
  let component: TaggedItemComponent;
  let fixture: ComponentFixture<TaggedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggedItemComponent ],
      imports: [ MatIconModule ]
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
