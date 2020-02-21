import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileService } from '@perx/core';
import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { MatListModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

const profileServiceStub: Partial<ProfileService> = {
  whoAmI: () => of()
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        MatListModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
