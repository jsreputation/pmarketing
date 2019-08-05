import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampsComponent } from './stamps.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('StampsComponent', () => {
  let component: StampsComponent;
  let fixture: ComponentFixture<StampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StampsComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
