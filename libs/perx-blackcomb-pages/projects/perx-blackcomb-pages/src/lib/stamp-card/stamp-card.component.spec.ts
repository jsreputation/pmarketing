import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StampCardComponent } from './stamp-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PuzzlesModule, StampService } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('StampCardComponent', () => {
  let component: StampCardComponent;
  let fixture: ComponentFixture<StampCardComponent>;

  const stampServiceStub: Partial<StampService> = {
    getCurrentCard: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StampCardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        PuzzlesModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
