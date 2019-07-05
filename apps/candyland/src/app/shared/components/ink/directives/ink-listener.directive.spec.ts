import { InkListenerDirective } from './ink-listener.directive';
import { ElementRef } from '@angular/core';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('InkListenerDirective', () => {
  it('should create an instance', () => {
    const directive = new InkListenerDirective(new MockElementRef());
    expect(directive).toBeTruthy();
  });
});
