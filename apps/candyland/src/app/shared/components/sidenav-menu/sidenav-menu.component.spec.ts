import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuComponent } from './sidenav-menu.component';
import { SidenaveMenuItemComponent } from './sidenave-menu-item/sidenave-menu-item.component';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidenavMenuComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [
        SidenavMenuComponent,
        SidenaveMenuItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
