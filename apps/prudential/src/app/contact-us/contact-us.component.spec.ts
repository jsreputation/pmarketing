import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import { MatCardModule } from '@angular/material/card';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
