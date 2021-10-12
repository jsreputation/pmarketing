import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { EverydayComponent } from './every-day.component';
describe('SortComponent', () => {
  let component: EverydayComponent;
  let fixture: ComponentFixture<EverydayComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EverydayComponent
      ],
      imports: [
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
