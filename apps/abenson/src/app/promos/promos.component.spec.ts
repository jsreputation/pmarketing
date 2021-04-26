import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PromosComponent } from './promos.component';
import { of } from 'rxjs';
import { FeedReaderService } from '@perxtech/core';

describe('PromosComponent', () => {
  let component: PromosComponent;
  let fixture: ComponentFixture<PromosComponent>;

  const feedReaderServiceStub: Partial<FeedReaderService> = {
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
