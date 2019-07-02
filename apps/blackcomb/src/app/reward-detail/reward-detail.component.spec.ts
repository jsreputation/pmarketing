import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RewardDetailComponent } from './reward-detail.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDetailComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject(
    [Router], () => {
    expect(component).toBeTruthy();
  }));
});
