import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatCardModule, MatButtonModule } from '@angular/material';
import { LandingComponent } from './landing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsModule } from '@perx/core';
import { HttpClientModule } from '@angular/common/http';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterTestingModule,
        MatCardModule,
        UtilsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
