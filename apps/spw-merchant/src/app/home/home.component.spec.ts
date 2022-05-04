import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@perxtech/core';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routerStub = { navigate: () => ({}) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports : [
        MatButtonModule,
        TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerStub },
        {
          provide: AuthenticationService,
          useValue: { logout: () => null }
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
