import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule, MatCardModule, MatDialogModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PromosComponent } from './promos.component';
import { of } from 'rxjs';
import { FeedReaderService } from '@perx/core';

describe('PromosComponent', () => {
  let component: PromosComponent;
  let fixture: ComponentFixture<PromosComponent>;

  const feedReaderServiceStub = {
    getFromUrl: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromosComponent],
      imports: [
        NoopAnimationsModule,
        MatTabsModule,
        MatCardModule,
        MatDialogModule
      ],
      providers: [
        { provide: FeedReaderService, useValue: feedReaderServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
