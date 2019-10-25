import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LongTextComponent } from './long-text.component';

describe('LongTextComponent', () => {
  let component: LongTextComponent;
  let fixture: ComponentFixture<LongTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTextComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
