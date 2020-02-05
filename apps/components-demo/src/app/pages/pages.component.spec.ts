import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule, MatDialogModule } from '@angular/material';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesComponent ],
      imports: [
        RouterTestingModule,
        MatTabsModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
