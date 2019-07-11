import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMobilePreviewComponent } from './game-mobile-preview.component';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GameMobilePreviewComponent', () => {
  let component: GameMobilePreviewComponent;
  let fixture: ComponentFixture<GameMobilePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule
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
