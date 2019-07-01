import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule
 } from '@angular/material';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [BrowserAnimationsModule, MatTabsModule, MatCardModule, MatButtonModule, MatRippleModule, MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
