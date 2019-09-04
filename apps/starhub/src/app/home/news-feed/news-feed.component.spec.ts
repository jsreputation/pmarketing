import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedComponent } from './news-feed.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { FeedReaderService } from '@perx/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { of } from 'rxjs';

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;
  const feedReaderServiceStub = {
    getFromUrl: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsFeedComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        NgxMultiLineEllipsisModule,
        ScrollingModule
      ],
      providers: [
        { provide: FeedReaderService, useValue: feedReaderServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
