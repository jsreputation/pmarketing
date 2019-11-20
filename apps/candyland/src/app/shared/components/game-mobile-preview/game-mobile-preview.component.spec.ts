import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMobilePreviewComponent } from './game-mobile-preview.component';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('GameMobilePreviewComponent', () => {
  let component: GameMobilePreviewComponent;
  let fixture: ComponentFixture<GameMobilePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ GameMobilePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMobilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
