import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActionsComponent } from './bulk-actions.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BulkActionsComponent', () => {
  let component: BulkActionsComponent;
  let fixture: ComponentFixture<BulkActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BulkActionsComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
