import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FeedItem } from '@perxtech/core';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
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
      declarations: [PopupComponent],
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
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
