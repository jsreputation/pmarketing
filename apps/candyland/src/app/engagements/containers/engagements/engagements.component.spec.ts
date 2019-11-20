import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsComponent } from './engagements.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('EngagementsComponent', () => {
  let component: EngagementsComponent;
  let fixture: ComponentFixture<EngagementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ EngagementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
