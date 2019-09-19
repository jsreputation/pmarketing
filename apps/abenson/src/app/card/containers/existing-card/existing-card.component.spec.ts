import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ExistingCardComponent } from './existing-card.component';

import { SharedModule } from '../../../shared/shared.module';

describe('ExistingCardComponent', () => {
  let component: ExistingCardComponent;
  let fixture: ComponentFixture<ExistingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExistingCardComponent,
      ],
      imports: [
        SharedModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
