import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarNavItemComponent } from './toolbar-nav-item.component';

describe('ToolbarNavItemComponent', () => {
  let component: ToolbarNavItemComponent;
  let fixture: ComponentFixture<ToolbarNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarNavItemComponent],
      imports: [RouterTestingModule, MatIconModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
