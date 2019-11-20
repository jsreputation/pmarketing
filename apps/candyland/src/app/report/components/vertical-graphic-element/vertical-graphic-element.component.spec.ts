import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalGraphicElementComponent } from './vertical-graphic-element.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
describe('VerticalGraphicElementComponent', () => {
  let component: VerticalGraphicElementComponent;
  let fixture: ComponentFixture<VerticalGraphicElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalGraphicElementComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalGraphicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
