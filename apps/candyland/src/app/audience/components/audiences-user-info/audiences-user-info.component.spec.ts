import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiencesUserInfoComponent } from './audiences-user-info.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AudiencesUserInfoComponent', () => {
  let component: AudiencesUserInfoComponent;
  let fixture: ComponentFixture<AudiencesUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [],
      declarations: [
        AudiencesUserInfoComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
