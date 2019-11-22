import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyshopComponent } from './candyshop.component';
import { ButtonModule } from '@perx/candyshop';
import { RouterTestingModule } from '@angular/router/testing';

describe('CandyshopComponent', () => {
  let component: CandyshopComponent;
  let fixture: ComponentFixture<CandyshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandyshopComponent],
      imports: [
        ButtonModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
