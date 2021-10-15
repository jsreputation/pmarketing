import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { SearchHeaderComponent } from './search-header.component';

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent;
  let fixture: ComponentFixture<SearchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHeaderComponent ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
