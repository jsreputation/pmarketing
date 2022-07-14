import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { EmptyResultsComponent } from './empty-results.component';

describe('EmptyResultsComponent', () => {
  let component: EmptyResultsComponent;
  let fixture: ComponentFixture<EmptyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyResultsComponent],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
