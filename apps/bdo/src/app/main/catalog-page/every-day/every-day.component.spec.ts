import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { EverydayComponent } from './every-day.component';
import {MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SortComponent', () => {
  let component: EverydayComponent;
  let fixture: ComponentFixture<EverydayComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EverydayComponent
      ],
      imports: [
        MatSelectModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
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
    fixture = TestBed.createComponent(EverydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
