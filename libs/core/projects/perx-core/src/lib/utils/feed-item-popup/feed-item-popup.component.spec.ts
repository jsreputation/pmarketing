import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { FeedItemPopupComponent } from './feed-item-popup.component';

import { FeedItem } from '../feed-reader.service';
import {Router} from '@angular/router';

describe('FeedItemPopupComponent', () => {
  let component: FeedItemPopupComponent;
  let fixture: ComponentFixture<FeedItemPopupComponent>;
  const router = {
    navigate: jest.fn()
  };

  const dataMock: FeedItem = {
    title: '',
    description: '',
    descriptionWithURL: '',
    link: '',
    guid: '',
    pubDate: new Date()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedItemPopupComponent],
      imports: [
        MatIconModule,
        MatDialogModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: dataMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
