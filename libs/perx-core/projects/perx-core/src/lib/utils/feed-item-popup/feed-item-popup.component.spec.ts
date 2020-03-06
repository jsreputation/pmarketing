import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatIconModule,
  MAT_DIALOG_DATA,
} from '@angular/material';

import { FeedItemPopupComponent } from './feed-item-popup.component';

import { FeedItem } from '../feed-reader.service';

describe('FeedItemPopupComponent', () => {
  let component: FeedItemPopupComponent;
  let fixture: ComponentFixture<FeedItemPopupComponent>;
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
        MatIconModule
      ],
      providers: [
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
