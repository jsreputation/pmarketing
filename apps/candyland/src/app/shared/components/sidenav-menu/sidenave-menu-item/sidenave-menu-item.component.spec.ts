import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenaveMenuItemComponent } from './sidenave-menu-item.component';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidenaveMenuItemComponent', () => {
  let component: SidenaveMenuItemComponent;
  let fixture: ComponentFixture<SidenaveMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [ SidenaveMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenaveMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
