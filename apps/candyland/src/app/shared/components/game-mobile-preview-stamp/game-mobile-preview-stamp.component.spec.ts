import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMobilePreviewStampComponent } from './game-mobile-preview-stamp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';

describe('GameMobilePreviewStampComponent', () => {
  let component: GameMobilePreviewStampComponent;
  let fixture: ComponentFixture<GameMobilePreviewStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule
      ],
      declarations: [ GameMobilePreviewStampComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMobilePreviewStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
