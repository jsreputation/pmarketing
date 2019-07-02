import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InkComponent } from './ink.component';
import { InkBarDirective } from '@cl-shared/components/ink/directives/ink-bar.directive';
import { InkHostDirective } from '@cl-shared/components/ink/directives/ink-host.directive';
import { InkListenerDirective } from '@cl-shared/components/ink/directives/ink-listener.directive';

describe('InkComponent', () => {
  let component: InkComponent;
  let fixture: ComponentFixture<InkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InkComponent,
        InkBarDirective,
        InkHostDirective,
        InkListenerDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
